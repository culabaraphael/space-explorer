<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/10085305-6477-40b9-b407-429bc6de3e10" />
# Space Explorer 🚀

A beautiful web application for exploring NASA's Astronomy Picture of the Day (APOD) collection. Built with Laravel, React, and Inertia.js.


## Features ✨

- 🌌 **Explore NASA Images**: Browse through stunning space imagery from NASA's APOD collection
- 🔍 **Smart Filtering**: Filter by Planets, Galaxies, Mars, Moon, or view all
- 🔎 **Search**: Search images by title or description
- 📖 **Personal Journal**: Save your favorite discoveries with personal notes
- ✏️ **Full CRUD**: Create, Read, Update, and Delete your saved discoveries
- 🎨 **Beautiful UI**: Animated star background and smooth transitions
- 📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- 🔐 **Authentication**: Secure user accounts with Laravel Breeze

## Tech Stack 🛠️

**Backend:**
- Laravel 10
- MySQL Database
- Laravel Breeze (Authentication)
- NASA APOD API Integration

**Frontend:**
- React 18.3.1
- Inertia.js
- Tailwind CSS
- DaisyUI
- Framer Motion (Animations)

## Prerequisites 📋

Before you begin, ensure you have installed:
- PHP >= 8.1
- Composer
- Node.js >= 16.x
- MySQL or SQLite
- Git

## Installation 🚀

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/space-explorer.git
cd space-explorer
```

### 2. Install PHP dependencies
```bash
composer install
```

### 3. Install NPM dependencies
```bash
npm install
```

### 4. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 5. Configure Database

Edit `.env` file and set your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=space_explorer
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 6. Get NASA API Key (Optional but Recommended)

1. Visit: https://api.nasa.gov/
2. Sign up for a free API key
3. Add to `.env`:
```env
NASA_API_KEY=your_nasa_api_key_here
```

If you don't add a key, the app will use `DEMO_KEY` (30 requests/hour limit).

### 7. Run Migrations
```bash
php artisan migrate
```

### 8. Start Development Servers

**Terminal 1 - Laravel:**
```bash
php artisan serve
```

**Terminal 2 - Vite (React):**
```bash
npm run dev
```

### 9. Access the Application

Open your browser and go to:
