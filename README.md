Realtime Investment Tracker Platform
📝 Overview
This is a simulated investment tracking platform for assets like crypto and stocks, featuring real-time trading and a simple social feed. Built as a Minimum Viable Product (MVP), it includes Google authentication, real-time portfolio tracking, market order placement, price charts, order history, and activity feed.

Tech Stack: Next.js (Frontend), NestJS (Backend), PostgreSQL, Redis, TailwindCSS.
Package Manager: pnpm.
Monorepo: Managed with Nx.
Status: In development (Sprint 1 ongoing).

🚀 Getting Started
Prerequisites

Node.js (v18.x or later)
pnpm (install with npm install -g pnpm)
Docker (for database and Redis)

Installation

Clone the repository:git clone https://github.com/your-username/investment-tracker.git
cd investment-tracker

Install dependencies:pnpm install

Set up environment variables:
Create a .env file in the root directory.
Add Google OAuth credentials (e.g., GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET).
Example:GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

Start Docker services:docker-compose up -d

Run the development server:pnpm nx serve frontend
pnpm nx serve backend

Frontend: http://localhost:4200
Backend: http://localhost:3333

📂 Project Structure
investment-tracker/
├── apps/
│ ├── frontend/ # Next.js application
│ ├── backend/ # NestJS application
├── libs/ # Shared libraries (if any)
├── docker-compose.yml
├── package.json
├── pnpm-lock.yaml
├── README.md
└── .env

🛠 Development

Run all apps: pnpm nx run-many --target=serve --all
Build apps: pnpm nx run-many --target=build --all
Test changes: Use pnpm nx affected to build/test affected projects.

📚 Documentation

Product Requirements (PRD): 01-PRD.md
API Specification: 03-API_SPEC.md
Technical Specification: 02-TECH_SPEC.md
Database Schema: 04-ERD.drawio
System Architecture: [05-System Architecture Diagram.puml](docs/05-System Architecture Diagram.puml)

🤝 Contributing

Fork the repository.
Create a new branch: git checkout -b feature/your-feature.
Commit changes: git commit -m "Add your feature".
Push to the branch: git push origin feature/your-feature.
Open a Pull Request.

📌 License
This project is under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

Inspired by xAI's innovative approach to AI-driven platforms.
Built with love using Nx, pnpm, and the open-source community.
