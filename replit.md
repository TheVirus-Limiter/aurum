# Lumora Sleep Website

## Overview

This is a luxury sleep mask website built with Next.js 14, showcasing the "Lumora Sleep" product line - premium sleep masks that harmonize temperature, sound, and light for optimal sleep experiences. The site features a modern dark theme design with a comprehensive waitlist system, admin dashboard, and responsive layout optimized for conversions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 14 with App Router for modern React patterns and server-side rendering
- **Styling**: Tailwind CSS with custom CSS variables for theming, using shadcn/ui component library for consistent design system
- **UI Components**: Radix UI primitives wrapped in custom components for accessibility and consistency
- **State Management**: React hooks (useState, useEffect) for client-side state, no external state management needed for current scope
- **Typography**: Inter font family with Geist as secondary option for clean, modern appearance

### Component Structure
- **Design System**: shadcn/ui components (Button, Input, Card, Dialog, etc.) providing consistent styling and behavior
- **Layout**: Responsive design with mobile-first approach using Tailwind's responsive utilities
- **Icons**: Lucide React for consistent iconography throughout the application
- **Theme**: Dark theme by default with CSS custom properties for easy theme switching

### Backend Architecture
- **API Routes**: Next.js API routes for serverless functions handling waitlist and admin operations
- **Data Storage**: In-memory storage using simple TypeScript objects (suitable for demo/development, production would require database)
- **Email Integration**: Formspree integration for sending notification emails when users join waitlist

### Form Handling
- **Validation**: Client-side email validation with server-side verification
- **Error Handling**: Comprehensive error states for duplicate emails and validation failures
- **User Feedback**: Toast notifications and success states for form submissions

### Admin System
- **Authentication**: Simple password-based authentication for admin access (password: "lumora2024!")
- **Dashboard**: View all waitlist entries with user details, timestamps, and analytics
- **Data Management**: Export capabilities and user management through dedicated admin interface

## External Dependencies

### Core Framework Dependencies
- **Next.js 14**: React framework with App Router for modern web development
- **React 18**: Latest React version with concurrent features
- **TypeScript**: Type safety and improved developer experience

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Comprehensive set of accessible, unstyled UI components
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Utility for creating variant-based component APIs

### Form and Interaction
- **React Hook Form**: Efficient form state management with validation
- **date-fns**: Date manipulation utilities for timestamp formatting
- **cmdk**: Command palette functionality (imported but not actively used)

### Email Service
- **Formspree**: External email service for sending notifications (endpoint: https://formspree.io/f/xdkogkpv)

### Development Tools
- **autoprefixer**: CSS vendor prefixing
- **ESLint**: Code linting and formatting standards

### Key Integrations
- **Google Forms**: External redirect for additional form collection (https://forms.gle/Y12pZAknPUjmjM7p6)
- **Static Assets**: Logo and team images served from /public/images directory