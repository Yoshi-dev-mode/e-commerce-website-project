<!-- E-commerce Website Project | Root README -->

<div align="center">

  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:111827,45:312e81,100:0891b2&height=230&section=header&text=E-Commerce%20Website&fontSize=44&fontColor=ffffff&fontAlignY=38&desc=A%20Full-Stack%20Web%20Development%20Project&descAlignY=59&descSize=16" width="100%" alt="E-Commerce Website project banner" />

  <p><strong>A full-stack commerce experience built with modern web technologies.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Frontend-Next.js-111827?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
    <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
    <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  </p>

  <p>
    <a href="#-overview">Overview</a> •
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-getting-started">Getting Started</a>
  </p>

</div>

---

## 🛍️ Overview

This repository contains a full-stack e-commerce website project with a **Next.js and TypeScript client** and a **Node.js/Express backend with PostgreSQL**.

The frontend includes product discovery and category-based pages for food, drinks, canned beverages, sweets, and other product groups. It uses reusable React components and client-side data tools to support a more organized shopping experience.

The project is intended to demonstrate practical full-stack development: building a component-based interface, organizing client/server code, connecting an application to a relational database, and structuring a codebase for future improvements.

> **Project principle:** Build useful features, keep the code organized, and improve the experience one iteration at a time.

## ✨ Features

Based on the current project structure, the application includes:

- **Product discovery interface** with dedicated food and drink sections.
- **Category and product pages** for browsing different product groups.
- **Reusable UI components** for shared interface elements such as navigation and footer.
- **Cart state provider** to manage shopping-cart state on the client.
- **Data-fetching foundation** using TanStack Query and Axios.
- **Responsive styling foundation** with Tailwind CSS and Material UI components.
- **PostgreSQL setup files** in the server directory.

*This list describes capabilities and foundations visible in the codebase; it does not imply that payment processing, authentication, deployment, or every end-to-end checkout flow is implemented.*

## 🧰 Tech Stack

| Technology | Role |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework for the client application |
| [React 18](https://react.dev/) | Component-based user interface |
| [TypeScript](https://www.typescriptlang.org/) | Typed JavaScript for more maintainable code |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Material UI](https://mui.com/) | UI components and icons |
| [TanStack Query](https://tanstack.com/query/latest) | Client-side server-state and data-fetching tools |
| [Axios](https://axios-http.com/) | HTTP requests from the client |
| [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) | Backend runtime and API framework |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |

## 🗂️ Project Structure

```text
e-commerce-website-project/
├── client/                 # Next.js frontend application
│   ├── app/
│   │   ├── components/     # Shared UI and provider components
│   │   ├── container/      # Page sections and reusable containers
│   │   ├── drinks/         # Drink category and product pages
│   │   └── ...             # Other routes and application files
│   ├── package.json
│   └── README.md
│
└── server/                 # Backend and database setup
    ├── database.sql        # SQL database setup
    ├── db.js               # Database connection configuration
    └── ...
```

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) (use a version compatible with the dependencies)
- npm, which is included with Node.js
- [PostgreSQL](https://www.postgresql.org/) if you want to run the database-backed functionality

### 1. Clone the repository

```bash
git clone https://github.com/Yoshi-dev-mode/e-commerce-website-project.git
cd e-commerce-website-project
```

### 2. Set up the frontend

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For a production build, use:

```bash
npm run build
npm start
```

### 3. Configure the backend and database

The backend and database setup are located in the `server/` directory. Review `server/db.js` and `server/database.sql` before starting the backend.

1. Create a PostgreSQL database for the project.
2. Configure database connection settings for your local environment.
3. Apply the SQL in `server/database.sql` to initialize the required schema.
4. Inspect the server's available scripts and entry point, then install its dependencies and start it using the commands defined by the project.

**Configuration note:** Do not commit database passwords, API keys, or other secrets. Use environment variables and a local `.env` file where appropriate, and ensure that file is ignored by Git.

The client and server may require additional environment configuration to communicate correctly. Check the relevant source files before assuming a default API URL or port.

## 🧑‍💻 Development Workflow

When contributing to or extending this project:

1. Explore the existing routes and components before adding new ones.
2. Keep shared UI in reusable components.
3. Keep database access and server-side logic separate from presentation code.
4. Validate user input and handle loading, empty, and error states.
5. Test both the frontend and backend after changes.
6. Keep secrets and local environment files out of version control.

## 🛣️ Possible Next Improvements

Potential future enhancements, depending on project goals, include:

- Complete end-to-end cart and checkout flows.
- Product search, filtering, and sorting.
- User authentication and order history.
- Server-side validation and consistent API error handling.
- Automated tests for important UI and API behavior.
- Deployment documentation and screenshots of the running application.

These are possible directions for future development, not claims that they are already implemented.

## 🎯 What This Project Demonstrates

This project provides a place to practice and showcase:

- Building a multi-page React application with Next.js.
- Creating reusable components and organizing routes.
- Using TypeScript in a frontend codebase.
- Connecting frontend data-fetching tools to API endpoints.
- Separating client, server, and database responsibilities.
- Iterating on a practical application with a modern web stack.

---

<div align="center">

  **Designed to learn by building. Improved one feature at a time.**

  <a href="https://github.com/Yoshi-dev-mode/e-commerce-website-project">
    <img src="https://img.shields.io/badge/Explore%20Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="Explore repository"/>
  </a>

  <br/><br/>
  <sub>Built with curiosity, experimentation, and a focus on full-stack development.</sub>

</div>
