<img width="1916" height="905" alt="image" src="https://github.com/user-attachments/assets/9edaf20d-ffa0-499e-97a0-1eb930db7f40" />


# 🚀 Cosmic Explorer

<div align="center">

![Cosmic Explorer Banner](https://img.shields.io/badge/Cosmic-Explorer-blue?style=for-the-badge&logo=rocket)

**A Journey Through the Universe**

[![Laravel](https://img.shields.io/badge/Laravel-10-FF2D20?style=flat-square&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-1.0-9553E9?style=flat-square)](https://inertiajs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation-for-users) • [How We Built It](#-how-we-built-this-project) • [Team](#-team)

</div>

---

## 📖 About The Project

**Cosmic Explorer** is a full-stack web application that lets users explore NASA's Astronomy Picture of the Day (APOD) collection. Users can browse stunning space imagery, save their favorite discoveries to a personal journal, and add their own notes — creating their own cosmic journey through the universe.

This project was built as a Final Project for **IT110 - Web Systems and Technologies** at **Caraga State University**.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌌 **Explore NASA Images** | Browse stunning space imagery from NASA's APOD API |
| 🔍 **Smart Filtering** | Filter by Planets, Galaxies, Mars, Moon, or view all |
| 🔎 **Search Function** | Search images by title or description |
| 📖 **Personal Journal** | Save favorite discoveries with personal notes |
| ✏️ **Full CRUD** | Create, Read, Update, and Delete saved discoveries |
| 🎨 **Animated UI** | Beautiful star background and smooth Framer Motion transitions |
| 📱 **Responsive** | Works perfectly on mobile, tablet, and desktop |
| 🔐 **Authentication** | Secure user accounts with Laravel Breeze |

---

## 🛠 Tech Stack

### Backend
- **Laravel 10** - PHP Framework
- **MySQL** - Database
- **Laravel Breeze** - Authentication
- **NASA APOD API** - External API

### Frontend
- **React 18** - UI Library
- **Inertia.js** - Laravel-React Bridge
- **Tailwind CSS** - Styling
- **DaisyUI** - UI Components
- **Framer Motion** - Animations

### Tools
- **Git & GitHub** - Version Control
- **VS Code** - Code Editor
- **Laragon/XAMPP** - Local Development

---

## 📋 Prerequisites

Before installing, make sure you have:

| Software | Version | Download Link |
|----------|---------|---------------|
| PHP | 8.1 or higher | [php.net](https://www.php.net/downloads) |
| Composer | Latest | [getcomposer.org](https://getcomposer.org/download/) |
| Node.js | 16.x or higher | [nodejs.org](https://nodejs.org/) |
| MySQL | 5.7 or higher | [mysql.com](https://dev.mysql.com/downloads/) |
| Git | Latest | [git-scm.com](https://git-scm.com/downloads) |

### 💡 Recommended: Use Laragon (Windows)

For Windows users, we recommend **Laragon** as it includes PHP, MySQL, and Composer all-in-one:

**Download Laragon:** https://laragon.org/download/

---

## 🚀 Installation (For Users)

Follow these steps to run the project on your computer.

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/space-explorer.git
cd space-explorer
```

### Step 2: Install PHP Dependencies

```bash
composer install
```

**⚠️ If you get an error:**
```bash
# Delete lock file and try again
del composer.lock        # Windows
rm composer.lock         # Mac/Linux

composer update
```

### Step 3: Install JavaScript Dependencies

```bash
npm install
```

### Step 4: Environment Setup

```bash
# Copy the example environment file
cp .env.example .env     # Mac/Linux
copy .env.example .env   # Windows

# Generate application key
php artisan key:generate
```

### Step 5: Configure Database

1. **Create a database** named `space_explorer` in MySQL

   Using command line:
   ```bash
   mysql -u root -p
   CREATE DATABASE space_explorer;
   exit;
   ```

   Or use **phpMyAdmin** / **HeidiSQL** (GUI)

2. **Edit the `.env` file** with your database credentials:

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=space_explorer
   DB_USERNAME=root
   DB_PASSWORD=
   ```

### Step 6: Get NASA API Key (Optional)

1. Visit: https://api.nasa.gov/
2. Sign up for a **FREE** API key
3. Add to `.env` file:

   ```env
   NASA_API_KEY=your_api_key_here
   ```

   *If you skip this, the app uses `DEMO_KEY` (limited to 30 requests/hour)*

### Step 7: Run Database Migrations

```bash
php artisan migrate
```

### Step 8: Start the Application

**Open TWO terminals:**

**Terminal 1 - Laravel Backend:**
```bash
php artisan serve
```

**Terminal 2 - React Frontend:**
```bash
npm run dev
```

### Step 9: Open in Browser

Go to: **http://localhost:8000**

🎉 **You're ready to explore the cosmos!**

---

## 🔧 Troubleshooting

### Common Issues and Solutions

| Problem | Solution |
|---------|----------|
| `composer install` fails | Delete `composer.lock` then run `composer update` |
| "No php.ini file" | Copy `php.ini-development` to `php.ini` in your PHP folder |
| "MySQL connection refused" | Make sure MySQL is running (start XAMPP/Laragon) |
| "npm not found" | Install Node.js from nodejs.org |
| Page shows blank/error | Make sure BOTH `php artisan serve` AND `npm run dev` are running |
| "Class not found" | Run `composer dump-autoload` |
| Migration fails | Check database credentials in `.env` file |

---

## 📁 Project Structure

```
space-explorer/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── ExploreController.php    # NASA API & Explore page
│   │       └── JourneyController.php    # CRUD operations
│   └── Models/
│       ├── User.php                     # User model
│       └── Discovery.php                # Saved discoveries model
├── database/
│   └── migrations/
│       └── create_discoveries_table.php # Journal table structure
├── resources/
│   └── js/
│       ├── Components/
│       │   └── Navbar.jsx               # Navigation component
│       └── Pages/
│           ├── Home.jsx                 # Landing page
│           ├── Explore.jsx              # Browse NASA images
│           ├── DailyDiscovery.jsx       # Gallery page
│           └── MyJourney.jsx            # Personal journal (CRUD)
├── routes/
│   └── web.php                          # All routes defined here
├── .env                                 # Environment variables
└── README.md                            # This file
```

---

## 🏗 How We Built This Project

This section documents our development process step-by-step.

### Phase 1: Project Setup

#### 1.1 Create Laravel Project with React + Inertia

```bash
# Create new Laravel project
composer create-project laravel/laravel space-explorer

cd space-explorer

# Install Laravel Breeze with React
composer require laravel/breeze --dev
php artisan breeze:install react

# Install dependencies
npm install
```

#### 1.2 Install Additional Packages

```bash
# Tailwind CSS (included with Breeze)
# DaisyUI for UI components
npm install daisyui

# Framer Motion for animations
npm install framer-motion
```

#### 1.3 Configure DaisyUI

Edit `tailwind.config.js`:
```javascript
module.exports = {
    // ... other config
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: ["dark"],
    },
}
```

---

### Phase 2: Database Setup

#### 2.1 Create Migration for Discoveries

```bash
php artisan make:migration create_discoveries_table
```

Edit the migration file:
```php
public function up()
{
    Schema::create('discoveries', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->string('nasa_image_url');
        $table->string('nasa_image_title');
        $table->text('nasa_explanation');
        $table->date('nasa_date');
        $table->text('user_note')->nullable();
        $table->timestamps();
    });
}
```

#### 2.2 Create Discovery Model

```bash
php artisan make:model Discovery
```

Edit `app/Models/Discovery.php`:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discovery extends Model
{
    protected $fillable = [
        'user_id',
        'nasa_image_url',
        'nasa_image_title',
        'nasa_explanation',
        'nasa_date',
        'user_note',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

#### 2.3 Run Migration

```bash
php artisan migrate
```

---

### Phase 3: NASA API Integration

#### 3.1 Create Explore Controller

```bash
php artisan make:controller ExploreController
```

Edit `app/Http/Controllers/ExploreController.php`:
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ExploreController extends Controller
{
    public function index()
    {
        // Cache API response for 1 hour
        $apods = Cache::remember('nasa_apods', 3600, function () {
            $response = Http::get('https://api.nasa.gov/planetary/apod', [
                'api_key' => env('NASA_API_KEY', 'DEMO_KEY'),
                'count' => 30,
            ]);
            
            return $response->json();
        });

        return Inertia::render('Explore', [
            'apods' => $apods
        ]);
    }

    public function dailyDiscovery()
    {
        $apod = Cache::remember('daily_apod', 3600, function () {
            $response = Http::get('https://api.nasa.gov/planetary/apod', [
                'api_key' => env('NASA_API_KEY', 'DEMO_KEY'),
            ]);
            
            return $response->json();
        });

        return Inertia::render('DailyDiscovery', [
            'apod' => $apod
        ]);
    }
}
```

---

### Phase 4: CRUD Operations (Journal)

#### 4.1 Create Journey Controller

```bash
php artisan make:controller JourneyController
```

Edit `app/Http/Controllers/JourneyController.php`:
```php
<?php

namespace App\Http\Controllers;

use App\Models\Discovery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JourneyController extends Controller
{
    // READ - Display all user's discoveries
    public function index()
    {
        $discoveries = Discovery::where('user_id', auth()->id())
                                ->orderBy('created_at', 'desc')
                                ->get();

        return Inertia::render('MyJourney', [
            'discoveries' => $discoveries
        ]);
    }

    // CREATE - Store new discovery
    public function store(Request $request)
    {
        $request->validate([
            'nasa_image_url' => 'required|url',
            'nasa_image_title' => 'required|string',
            'nasa_explanation' => 'required|string',
            'nasa_date' => 'required|date',
        ]);

        Discovery::create([
            'user_id' => auth()->id(),
            'nasa_image_url' => $request->nasa_image_url,
            'nasa_image_title' => $request->nasa_image_title,
            'nasa_explanation' => $request->nasa_explanation,
            'nasa_date' => $request->nasa_date,
            'user_note' => $request->user_note,
        ]);

        return redirect()->back()->with('success', 'Discovery saved!');
    }

    // UPDATE - Update discovery note
    public function update(Request $request, Discovery $discovery)
    {
        $discovery->update([
            'user_note' => $request->user_note
        ]);

        return redirect()->back()->with('success', 'Note updated!');
    }

    // DELETE - Remove discovery
    public function destroy(Discovery $discovery)
    {
        $discovery->delete();

        return redirect()->back()->with('success', 'Discovery removed!');
    }
}
```

---

### Phase 5: Routes Setup

Edit `routes/web.php`:
```php
<?php

use App\Http\Controllers\ExploreController;
use App\Http\Controllers\JourneyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/explore', [ExploreController::class, 'index']);
Route::get('/daily-discovery', [ExploreController::class, 'dailyDiscovery']);

// Protected Routes (must be logged in)
Route::middleware('auth')->group(function () {
    Route::get('/my-journey', [JourneyController::class, 'index'])->name('journey.index');
    Route::post('/journey', [JourneyController::class, 'store'])->name('journey.store');
    Route::put('/journey/{discovery}', [JourneyController::class, 'update'])->name('journey.update');
    Route::delete('/journey/{discovery}', [JourneyController::class, 'destroy'])->name('journey.destroy');
});

require __DIR__.'/auth.php';
```

---

### Phase 6: Frontend Pages

#### 6.1 Create React Pages

All pages are in `resources/js/Pages/`:

- **Home.jsx** - Landing page with animated stars
- **Explore.jsx** - Browse NASA images with filters
- **DailyDiscovery.jsx** - Gallery page
- **MyJourney.jsx** - Personal journal with CRUD

#### 6.2 Create Navbar Component

`resources/js/Components/Navbar.jsx` - Reusable navigation

---

### Phase 7: Styling & Animations

#### 7.1 Animated Star Background

Using Canvas API for moving stars effect on Home and Explore pages.

#### 7.2 Framer Motion Animations

- Fade-in effects on page load
- Scale animations on hover
- Smooth transitions between states

---

### Phase 8: Version Control

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Space Explorer with NASA API"

# Add remote repository
git remote add origin https://github.com/yourusername/space-explorer.git

# Push to GitHub
git push -u origin master
```

---

## 📸 Screenshots

### Home Page
*Beautiful landing page with animated star background*

### Explore Page
*Browse and filter NASA space images*

### My Journey
*Personal journal with saved discoveries*

---

## 👥 Team

**Group 6 - FP1**

| Role | Name | Responsibilities |
|------|------|------------------|
| Project Lead / QA | [Name] | Task coordination, testing |
| Backend Lead | [Name] | Laravel, API, Database |
| Frontend Lead | [Name] | React, Inertia.js, UI |
| Documentation & Styling | [Name] | Reports, Tailwind, Animations |

---

## 📚 Resources & References

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Inertia.js Documentation](https://inertiajs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [NASA APOD API](https://api.nasa.gov/)
- [DaisyUI Components](https://daisyui.com/)

---

## 📄 License

This project is created for educational purposes as part of IT110 - Web Systems and Technologies at Caraga State University.

---

## 🙏 Acknowledgments

- **NASA** for providing the free APOD API
- **Caraga State University** - College of Computing and Information Sciences
- **Ma'am Mary Abigail D. Soliva** and **Ma'am Fritzie T. Nuñez** - Course Instructors

---

<div align="center">

**Made with ❤️ by Group 6**

*Begin Your Cosmic Journey* 🚀🌌

</div>
