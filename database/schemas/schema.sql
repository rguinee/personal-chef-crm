-- Personal Chef CRM Database Schema

-- Users table (for authentication and chef profiles)
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    profile_image_url VARCHAR(500),
    business_name VARCHAR(200),
    bio TEXT,
    specialties JSON, -- Array of specialties like ["Italian", "Vegan", "Gluten-Free"]
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE clients (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'USA',
    dietary_restrictions JSON, -- ["vegetarian", "gluten-free", "nut-allergy"]
    preferences JSON, -- ["spicy", "no-dairy", "low-sodium"]
    allergies JSON, -- ["nuts", "shellfish", "eggs"]
    notes TEXT,
    status ENUM('active', 'inactive', 'prospect') DEFAULT 'prospect',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_client_user (user_id),
    INDEX idx_client_status (status)
);

-- Categories table for organizing recipes
CREATE TABLE recipe_categories (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#2E7D32', -- Hex color for UI
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_category_per_user (user_id, name)
);

-- Recipes table
CREATE TABLE recipes (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    category_id VARCHAR(36),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    instructions TEXT NOT NULL,
    prep_time INT, -- in minutes
    cook_time INT, -- in minutes
    total_time INT GENERATED ALWAYS AS (prep_time + cook_time) STORED,
    servings INT DEFAULT 1,
    difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    cost_per_serving DECIMAL(8,2),
    dietary_tags JSON, -- ["vegetarian", "gluten-free", "dairy-free"]
    cuisine_type VARCHAR(100),
    image_url VARCHAR(500),
    notes TEXT,
    is_favorite BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT false, -- For sharing between chefs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES recipe_categories(id) ON DELETE SET NULL,
    INDEX idx_recipe_user (user_id),
    INDEX idx_recipe_category (category_id),
    INDEX idx_recipe_difficulty (difficulty),
    FULLTEXT idx_recipe_search (name, description, instructions)
);

-- Ingredients table
CREATE TABLE ingredients (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(200) NOT NULL UNIQUE,
    category VARCHAR(100), -- "produce", "meat", "dairy", etc.
    unit VARCHAR(50), -- default unit like "cups", "lbs", "pieces"
    cost_per_unit DECIMAL(8,2),
    nutritional_info JSON, -- calories, protein, carbs, etc.
    allergen_info JSON, -- ["dairy", "nuts", "gluten"]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_ingredient_category (category)
);

-- Recipe ingredients junction table
CREATE TABLE recipe_ingredients (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    recipe_id VARCHAR(36) NOT NULL,
    ingredient_id VARCHAR(36) NOT NULL,
    quantity DECIMAL(10,3) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    notes TEXT, -- "finely chopped", "room temperature"
    is_optional BOOLEAN DEFAULT false,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
    UNIQUE KEY unique_recipe_ingredient (recipe_id, ingredient_id)
);

-- Meal plans table
CREATE TABLE meal_plans (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    client_id VARCHAR(36) NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    meal_count INT DEFAULT 0,
    total_cost DECIMAL(10,2) DEFAULT 0,
    status ENUM('draft', 'proposed', 'approved', 'completed', 'cancelled') DEFAULT 'draft',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    INDEX idx_meal_plan_user (user_id),
    INDEX idx_meal_plan_client (client_id),
    INDEX idx_meal_plan_dates (start_date, end_date),
    INDEX idx_meal_plan_status (status)
);

-- Individual meals in meal plans
CREATE TABLE meal_plan_meals (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    meal_plan_id VARCHAR(36) NOT NULL,
    recipe_id VARCHAR(36),
    meal_date DATE NOT NULL,
    meal_type ENUM('breakfast', 'lunch', 'dinner', 'snack', 'dessert') NOT NULL,
    servings INT DEFAULT 1,
    cost_override DECIMAL(8,2), -- Override calculated cost
    notes TEXT,
    is_prepared BOOLEAN DEFAULT false,
    prepared_at TIMESTAMP NULL,
    FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE SET NULL,
    INDEX idx_meal_plan_date (meal_plan_id, meal_date),
    INDEX idx_meal_type (meal_type)
);

-- Shopping lists generated from meal plans
CREATE TABLE shopping_lists (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    meal_plan_id VARCHAR(36),
    name VARCHAR(200) NOT NULL,
    total_estimated_cost DECIMAL(10,2) DEFAULT 0,
    is_completed BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE SET NULL,
    INDEX idx_shopping_list_user (user_id),
    INDEX idx_shopping_list_meal_plan (meal_plan_id)
);

-- Shopping list items
CREATE TABLE shopping_list_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    shopping_list_id VARCHAR(36) NOT NULL,
    ingredient_id VARCHAR(36),
    name VARCHAR(200) NOT NULL, -- Can be custom item not in ingredients
    quantity DECIMAL(10,3) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    estimated_cost DECIMAL(8,2),
    actual_cost DECIMAL(8,2),
    is_purchased BOOLEAN DEFAULT false,
    store VARCHAR(100),
    notes TEXT,
    FOREIGN KEY (shopping_list_id) REFERENCES shopping_lists(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE SET NULL,
    INDEX idx_shopping_item_list (shopping_list_id),
    INDEX idx_shopping_item_purchased (is_purchased)
);

-- Invoices and billing
CREATE TABLE invoices (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    client_id VARCHAR(36) NOT NULL,
    meal_plan_id VARCHAR(36),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_rate DECIMAL(5,4) DEFAULT 0,
    tax_amount DECIMAL(10,2) GENERATED ALWAYS AS (subtotal * tax_rate) STORED,
    total_amount DECIMAL(10,2) GENERATED ALWAYS AS (subtotal + tax_amount) STORED,
    status ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled') DEFAULT 'draft',
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    paid_date DATE NULL,
    payment_method VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE SET NULL,
    INDEX idx_invoice_user (user_id),
    INDEX idx_invoice_client (client_id),
    INDEX idx_invoice_status (status),
    INDEX idx_invoice_dates (issue_date, due_date)
);

-- Invoice line items
CREATE TABLE invoice_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    invoice_id VARCHAR(36) NOT NULL,
    description VARCHAR(500) NOT NULL,
    quantity DECIMAL(10,3) DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
    INDEX idx_invoice_item_invoice (invoice_id)
);

-- Sessions table for user authentication
CREATE TABLE sessions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session_token (token),
    INDEX idx_session_expires (expires_at)
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_recipes_name ON recipes(name);
CREATE INDEX idx_ingredients_name ON ingredients(name);