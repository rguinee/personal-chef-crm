# Personal Chef CRM 🍽️

A comprehensive CRM, Recipe Manager, and Meal Planner designed specifically for personal chefs and culinary professionals.

## 📋 Overview

This application helps personal chefs manage their business operations, including client relationships, recipe organization, meal planning, and billing. Built with modern web technologies for scalability and ease of use.

## ✨ Features

### 🏢 Client Relationship Management
- **Client Profiles**: Store detailed client information, dietary restrictions, preferences, and allergies
- **Contact Management**: Track client communications and interaction history
- **Status Tracking**: Manage prospects, active clients, and inactive accounts

### 📚 Recipe Management
- **Recipe Library**: Organize recipes with categories, difficulty levels, and dietary tags
- **Ingredient Management**: Track ingredients with cost analysis and nutritional information
- **Recipe Costing**: Calculate cost per serving for accurate pricing
- **Search & Filter**: Find recipes by ingredients, dietary restrictions, or cuisine type

### 🗓️ Meal Planning
- **Custom Meal Plans**: Create personalized meal plans for clients
- **Calendar Integration**: Visual meal planning with date-based organization
- **Automatic Shopping Lists**: Generate shopping lists from meal plans
- **Cost Estimation**: Calculate total costs for meal plans and individual meals

### 💰 Billing & Invoicing
- **Invoice Generation**: Create professional invoices linked to meal plans
- **Payment Tracking**: Monitor payment status and due dates
- **Cost Analysis**: Track profitability per client and service

### 📊 Analytics & Reporting
- **Business Insights**: Track revenue, client acquisition, and popular recipes
- **Inventory Management**: Monitor ingredient usage and costs
- **Performance Metrics**: Analyze business growth and efficiency

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript + Material-UI + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: MySQL with comprehensive relational schema
- **Authentication**: JWT-based authentication system
- **API**: RESTful API design with proper error handling

### Project Structure
```
personal-chef-crm/
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Configuration files
│   ├── tests/              # Backend tests
│   └── docs/               # API documentation
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # Custom styles
│   ├── public/             # Static assets
│   └── tests/              # Frontend tests
├── database/               # Database related files
│   ├── migrations/         # Database migrations
│   ├── seeds/              # Seed data
│   └── schemas/            # Database schema definitions
└── docs/                   # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- MySQL (v8 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-chef-crm
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create `.env` files in both backend and frontend directories:
   
   **Backend (.env)**:
   ```env
   NODE_ENV=development
   PORT=3001
   DATABASE_URL=mysql://username:password@localhost:3306/personal_chef_crm
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:3000
   ```
   
   **Frontend (.env)**:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

4. **Set up the database**
   ```bash
   # Create database
   mysql -u root -p -e "CREATE DATABASE personal_chef_crm;"
   
   # Run schema (from project root)
   mysql -u root -p personal_chef_crm < database/schemas/schema.sql
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend server (http://localhost:3001) and frontend development server (http://localhost:3000).

### Individual Component Setup

**Backend only**:
```bash
npm run dev:backend
```

**Frontend only**:
```bash
npm run dev:frontend
```

## 📖 API Documentation

The API follows RESTful conventions with the following main endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Clients
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create new client
- `GET /api/clients/:id` - Get client details
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Recipes
- `GET /api/recipes` - List recipes with pagination/filtering
- `POST /api/recipes` - Create new recipe
- `GET /api/recipes/:id` - Get recipe details
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### Meal Plans
- `GET /api/meal-plans` - List meal plans
- `POST /api/meal-plans` - Create meal plan
- `GET /api/meal-plans/:id` - Get meal plan details
- `PUT /api/meal-plans/:id` - Update meal plan

### Ingredients
- `GET /api/ingredients` - Search ingredients
- `POST /api/ingredients` - Add new ingredient
- `PUT /api/ingredients/:id` - Update ingredient

## 🧪 Testing

### Run all tests
```bash
npm run test
```

### Backend tests
```bash
npm run test:backend
```

### Frontend tests
```bash
npm run test:frontend
```

### Test coverage
```bash
npm run test:coverage
```

## 🔧 Development

### Code Quality
```bash
# Lint all code
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run typecheck
```

### Database Operations
```bash
# Reset database (recreate schema)
mysql -u root -p personal_chef_crm < database/schemas/schema.sql

# Add sample data
mysql -u root -p personal_chef_crm < database/seeds/sample_data.sql
```

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm run start
```

## 📝 Database Schema

The database includes the following main entities:

- **Users**: Chef profiles and authentication
- **Clients**: Customer information and preferences
- **Recipes**: Recipe library with ingredients and instructions
- **Meal Plans**: Organized meal schedules for clients
- **Invoices**: Billing and payment tracking
- **Shopping Lists**: Generated from meal plans
- **Ingredients**: Master ingredient database

See `database/schemas/schema.sql` for the complete database schema.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing [issues](https://github.com/your-repo/personal-chef-crm/issues)
2. Create a new issue with detailed information about the problem
3. Include steps to reproduce and expected behavior

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Project setup and architecture
- [x] Database schema design
- [x] Basic authentication system
- [ ] Client management features
- [ ] Recipe management system

### Phase 2
- [ ] Meal planning functionality
- [ ] Shopping list generation
- [ ] Invoice and billing system
- [ ] Cost analysis tools

### Phase 3
- [ ] Mobile responsive design
- [ ] Advanced analytics dashboard
- [ ] Email integration
- [ ] Recipe sharing between chefs
- [ ] Mobile app (React Native)

### Phase 4
- [ ] Multi-tenant support
- [ ] API for third-party integrations
- [ ] Advanced reporting features
- [ ] Inventory management system

---

**Built with ❤️ for personal chefs and culinary professionals**