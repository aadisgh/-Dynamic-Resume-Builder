# Resume Builder Application

## Overview

This is a full-stack resume builder application that allows users to create, edit, and export professional resumes. The application features a modern React frontend with TypeScript, a Node.js/Express backend, and PostgreSQL database integration using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **State Management**: React hooks with local state and React Query for server state
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Configured for Replit with autoscale deployment
- **Development**: Hot reload with Vite integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL for persistent resume data
- **Local Storage**: Browser localStorage for auto-save functionality
- **Session Storage**: In-memory storage fallback for development

## Key Components

### Frontend Components
1. **Resume Editor**: Multi-section form with personal info, experience, education, and skills
2. **Resume Preview**: Real-time preview with multiple template options
3. **PDF Export**: Client-side PDF generation using html2pdf.js
4. **Form Sections**: Modular form components for each resume section
5. **UI Components**: Comprehensive set of reusable UI components from Shadcn/ui

### Backend Components
1. **REST API**: Express routes for CRUD operations on resumes
2. **Storage Layer**: Abstracted storage interface with in-memory fallback
3. **Schema Validation**: Zod schemas shared between frontend and backend
4. **Error Handling**: Centralized error handling middleware

### Database Schema
```typescript
resumes {
  id: serial primary key
  userId: text
  title: text (required)
  data: jsonb (required) // Resume content
  template: text (default: "modern")
  createdAt: timestamp
  updatedAt: timestamp
}
```

## Data Flow

1. **Resume Creation**: User fills out forms → Data validated with Zod → Saved to localStorage → Posted to API → Stored in database
2. **Resume Editing**: Data loaded from API → Populated in forms → Real-time preview updates → Auto-save to localStorage
3. **PDF Export**: Resume data → Rendered in preview template → Converted to PDF using html2pdf.js
4. **Template System**: Resume data processed through template components for consistent rendering

## External Dependencies

### Frontend Dependencies
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Zod integration for form validation
- **wouter**: Lightweight routing library
- **date-fns**: Date manipulation utilities
- **nanoid**: Unique ID generation
- **html2pdf.js**: Client-side PDF generation

### Backend Dependencies
- **drizzle-orm**: Type-safe SQL query builder
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **express**: Web application framework
- **zod**: Runtime type validation
- **tsx**: TypeScript execution for development

### UI/Styling Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: CSS class management
- **clsx**: Conditional class name utility

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with Vite dev server
- **Database**: PostgreSQL 16 via Replit
- **Hot Reload**: Vite HMR for frontend, tsx for backend
- **Port Configuration**: Backend on 5000, frontend proxied through Vite

### Production Build
- **Frontend**: Vite build with static asset optimization
- **Backend**: esbuild bundling for Node.js deployment
- **Database**: PostgreSQL with connection pooling
- **Deployment**: Replit autoscale with health checks

### Configuration
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Build Process**: `npm run build` creates production-ready artifacts
- **Start Command**: `npm run start` for production deployment

## Changelog
```
Changelog:
- June 18, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```