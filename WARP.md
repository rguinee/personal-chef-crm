# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Personal Chef CRM is a comprehensive CRM, Recipe Manager, and Meal Planner designed for personal chefs and culinary professionals. It's a monorepo with separate backend (Node.js/Express/TypeScript) and frontend (React/TypeScript/Vite) applications, using MySQL as the database.

## Development Commands

### Quick Start
```bash
# Install all dependencies (root, backend, frontend)
npm run install:all

# Start both backend and frontend development servers
npm run dev

# Start individual services
npm run dev:backend    # Backend only (port 3001)
npm run dev:frontend   # Frontend only (port 3000)
```

### Building
```bash
# Build everything for production
npm run build

# Build individual components
npm run build:backend
npm run build:frontend
```

### Testing
```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:backend
npm run test:frontend

# Backend-specific test commands (from backend/ directory)
npm run test:watch     # Jest watch mode
npm run test:coverage  # With coverage report

# Frontend-specific test commands (from frontend/ directory)
npm run test:ui        # Vitest UI
npm run test:run       # Run once without watch
```

### Code Quality
```bash
# Lint all code
npm run lint

# Lint specific parts
npm run lint:backend
npm run lint:frontend

# Type checking
cd backend && npm run typecheck
cd frontend && npm run typecheck

# Auto-fix linting issues
cd backend && npm run lint:fix
cd frontend && npm run lint:fix
```

### Database Operations
```bash
# Set up database (ensure MySQL is running)
mysql -u root -p -e "CREATE DATABASE personal_chef_crm;"

# Apply schema
mysql -u root -p personal_chef_crm < database/schemas/schema.sql

# Add sample data (if available)
mysql -u root -p personal_chef_crm < database/seeds/sample_data.sql
```

## Architecture

### Technology Stack
- **Backend**: Node.js + Express + TypeScript + MySQL
- **Frontend**: React 18 + TypeScript + Material-UI + Vite
- **Testing**: Jest (backend), Vitest (frontend)
- **Validation**: Joi (backend), Yup (frontend)
- **Database**: MySQL with comprehensive relational schema

### Project Structure
```
personal-chef-crm/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API route definitions
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── config/         # App configuration
│   └── tests/              # Backend tests
├── frontend/               # React SPA
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-based page components
│   │   ├── services/       # API client services
│   │   └── utils/          # Frontend utilities
│   └── tests/              # Frontend tests
└── database/               # Database management
    ├── schemas/            # SQL schema definitions
    ├── migrations/         # Database migrations
    └── seeds/              # Sample data
```

### Key Database Entities
The MySQL database includes these main entities with relationships:
- **users**: Chef profiles and authentication
- **clients**: Customer information with dietary restrictions/preferences
- **recipes**: Recipe library with ingredients, instructions, costing
- **recipe_categories**: Organization system for recipes
- **ingredients**: Master ingredient database with nutritional/cost info
- **meal_plans**: Organized meal schedules for clients
- **invoices**: Billing and payment tracking
- **shopping_lists**: Auto-generated from meal plans

### API Architecture
The backend follows RESTful conventions with these main endpoints:
- `/api/auth/*` - Authentication (register, login, profile)
- `/api/clients/*` - Client management CRUD operations
- `/api/recipes/*` - Recipe management with search/filtering
- `/api/meal-plans/*` - Meal planning functionality
- `/api/ingredients/*` - Ingredient database operations
- `/api/invoices/*` - Billing and invoice management

### Frontend Architecture
- **React Query**: Server state management and caching
- **React Router**: Client-side routing
- **Material-UI**: Component library and theming
- **React Hook Form + Yup**: Form handling and validation
- **Axios**: HTTP client for API communication

## Environment Configuration

### Backend (.env)
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=mysql://username:password@localhost:3306/personal_chef_crm
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

## Development Notes

### Database Technology Discrepancy
Note: The README mentions MySQL but backend package.json includes mongoose. The actual implementation uses MySQL based on the schema files. When working with database functionality, use MySQL patterns and the schema in `database/schemas/schema.sql`.

### Monorepo Structure
This is a workspace-based monorepo. Use root-level commands when possible, but some operations require working in specific directories (backend/ or frontend/).

### Testing Strategy
- Backend uses Jest for unit and integration tests
- Frontend uses Vitest with React Testing Library
- Run tests frequently during development, especially before commits

### Code Style
- TypeScript strict mode enabled in both frontend and backend
- ESLint configured for both environments with TypeScript support
- Consistent import/export patterns across the codebase

### Development Workflow
1. Always run `npm run install:all` after pulling changes
2. Use `npm run dev` for simultaneous frontend/backend development
3. Backend runs on :3001, frontend on :3000 with proxy configuration
4. Database changes should include both schema updates and migration scripts