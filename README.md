# Job Management System

A comprehensive web application for managing jobs, installations, team members and product catalog.

## Features

- **Job Management**: Create, track and update jobs with detailed information
- **Installation Tracking**: Monitor installation progress and updates
- **Product Catalog**: Manage curtain and blind products inventory
- **Team Management**: Organize team members by roles and responsibilities

## Tech Stack

- Frontend: React with TypeScript
- Framework: Vite Remix
- UI Components: Ant Design
- Styling: Tailwind CSS
- API: tRPC React Query
- Database: Prisma ORM

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

### Building for Production

1. Build the application
```bash
npm run build
```

2. Start production server
```bash
npm start
```

## Project Structure

- `/app/routes/_logged.**`: Protected routes for logged-in users
- `/app/routes/`: Public routes
- `/app/core/`: Core functionality and contexts
- `/app/designSystem/`: Reusable UI components

## Key Features

### Job Management
- Create and track customer jobs
- Update job status and progress
- Add notes and schedule appointments
- Generate and manage job sheets

### Installation Tracking
- Monitor installation progress
- Update completion status
- Track installation dates and details

### Product Catalog
- Manage product inventory
- Search and filter products
- Update product information

### Team Management
- Organize team members by roles
- Manage permissions and access
- Track team member activities

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.
