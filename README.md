# DevJourney - A Full-Stack Blogging App

![License](https://img.shields.io/badge/license-MIT-green) ![React](https://img.shields.io/badge/React-18-blue) ![Laravel](https://img.shields.io/badge/Laravel-9-red)

**DevJourney** is a modern full-stack blogging application built with **React** (frontend) and **Laravel** (backend). It features a clean and responsive UI powered by **Tailwind CSS**, dynamic routing with **React Router**, and RESTful API integration for managing blog posts.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup Instructions](#setup-instructions)
4. [License](#license)

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
- **Vite**: For compiling assets (CSS, JS).

---


## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PHP (v8.4 or higher)
- Composer (for Laravel dependencies)
- MySQL (or any compatible database)

### Installation Steps

#### 1. Clone the Repository
```
git clone https://github.com/your-username/devjourney.git
```
#### 2. Go to the Project Directory
```
cd devjourney
```

#### 3. Install Backend Dependencies
```
composer install
```
#### 4. Copy example env file
```
cp .env.example .env
```

#### 5. Generate APP Key
```
php artisan key:generate
```

#### 6. Update the \`.env\` file with your database credentials:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=devjourney
DB_USERNAME=root
DB_PASSWORD=
```

#### 7. Run migrations and seed the database:
```
php artisan migrate --seed
```

#### 8. Install Frontend Dependencies
Navigate to the \`resources/js\` directory and install Node.js dependencies:
```
npm install
```
#### 9. Compile frontend assets:
```
npm run dev
```

#### 10. Start the Application From Root directory of project
```
php artisan serve
```

The app will be available at \`http://localhost:8000`.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, feel free to reach out:

- Email: iamj.nayem@gmail.com
- [Github](https://github.com/iamjnayem/)
- [LinkedIn](https://www.linkedin.com/in/jnayem/)

