# DevJourney - A Full-Stack Blogging App

![License](https://img.shields.io/badge/license-MIT-green) ![React](https://img.shields.io/badge/React-18-blue) ![Laravel](https://img.shields.io/badge/Laravel-9-red)

**DevJourney** is a modern full-stack blogging application built with **React** (frontend) and **Laravel** (backend). It features a clean and responsive UI powered by **Tailwind CSS**, dynamic routing with **React Router**, and RESTful API integration for managing blog posts.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Setup Instructions](#setup-instructions)
5. [API Endpoints](#api-endpoints)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

- **Dynamic Blog List**: Display a list of blogs with filtering options (\`Latest\`, \`Popular\`, \`All\`).
- **Blog Details Page**: View detailed content for individual blog posts.
- **Dark Mode**: Toggle between light and dark themes for better accessibility.
- **Responsive Design**: Fully responsive layout using Tailwind CSS.
- **Search Functionality**: Search for blogs by title or keywords (coming soon).
- **Frontend Routing**: Seamless navigation using React Router.
- **RESTful API Integration**: Fetch and display blog data from a Laravel backend.

---

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces.
- **React Router**: For client-side routing.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios/Fetch API**: For making API calls to the Laravel backend.

### Backend
- **Laravel**: PHP framework for building the RESTful API.
- **MySQL**: Database for storing blog posts and other data.
- **Laravel Mix**: For compiling assets (CSS, JS).

---

## Folder Structure

\`\`\`
laravel-react-app/
├── resources/
│   ├── js/                  # React app source code
│   │   ├── components/      # Reusable components (e.g., Header, QuickLinks)
│   │   ├── pages/           # Page-level components (e.g., Home, BlogDetails)
│   │   ├── api/             # API utility functions for interacting with Laravel
│   │   ├── hooks/           # Custom React hooks (if any)
│   │   ├── context/         # React Context providers (if used)
│   │   ├── App.jsx          # Root React component
│   │   └── index.js         # Entry point for React app
│   ├── css/                 # Raw CSS or SCSS files
│   └── views/               # Blade templates (e.g., for serving the React app)
├── public/                  # Compiled assets (CSS, JS, images, etc.)
├── routes/                  # Laravel routes (web.php, api.php)
├── app/                     # Laravel backend logic (controllers, models, etc.)
├── webpack.mix.js           # Laravel Mix configuration for asset compilation
└── package.json             # Node.js dependencies for React app
\`\`\`

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PHP (v8.1 or higher)
- Composer (for Laravel dependencies)
- MySQL (or any compatible database)

### Installation Steps

#### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/your-username/devjourney.git
cd devjourney
\`\`\`

#### 2. Install Backend Dependencies
\`\`\`bash
composer install
cp .env.example .env
php artisan key:generate
\`\`\`

Update the \`.env\` file with your database credentials:
\`\`\`env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=devjourney
DB_USERNAME=root
DB_PASSWORD=
\`\`\`

Run migrations and seed the database:
\`\`\`bash
php artisan migrate --seed
\`\`\`

#### 3. Install Frontend Dependencies
Navigate to the \`resources/js\` directory and install Node.js dependencies:
\`\`\`bash
npm install
\`\`\`

Compile frontend assets:
\`\`\`bash
npm run dev
\`\`\`

#### 4. Start the Application
Start the Laravel development server:
\`\`\`bash
php artisan serve
\`\`\`

The app will be available at \`http://localhost:8000\`.

---

## API Endpoints

### Blogs

| Method | Endpoint        | Description                     |
|--------|-----------------|---------------------------------|
| GET    | \`/api/blogs\`    | Fetch all blog posts           |
| GET    | \`/api/blogs/{id}\` | Fetch a single blog post by ID |

---

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   \`\`\`bash
   git checkout -b feature-name
   \`\`\`
3. Commit your changes:
   \`\`\`bash
   git commit -m "Add feature or fix"
   \`\`\`
4. Push your branch:
   \`\`\`bash
   git push origin feature-name
   \`\`\`
5. Open a pull request on GitHub.

Please ensure your code follows the project's coding standards and includes appropriate tests.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, feel free to reach out:

- Email: your-email@example.com
- GitHub: [Your GitHub Profile](https://github.com/your-username)
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/your-profile)

