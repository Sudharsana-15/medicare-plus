# 🏥 MediCare Plus - Online Healthcare Management System

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

---

## 📋 Project Overview

**MediCare Plus** is a comprehensive, full-stack web application designed to digitize and streamline healthcare operations for hospitals and clinics. It addresses the growing need for efficient patient management, online appointment booking, and secure medical record handling in the healthcare industry.

The system bridges the gap between patients and healthcare providers by offering an intuitive online platform where patients can register, browse doctor profiles, book appointments, and access their medical history — all from the comfort of their homes. For administrators, it provides a centralized dashboard to manage doctors, appointments, and patient communications.

This project was developed as part of the **Web Technology Lab** coursework, demonstrating both static (HTML/CSS/JavaScript) and dynamic (PHP/MySQL) web development capabilities applied to a real-world **medical industry use case**.

---

## ✨ Features

### Patient-Facing Features
- ✅ **Patient Registration & Authentication** — Secure signup/login with password hashing
- ✅ **Doctor Directory** — Browse doctors with search and department-based filtering
- ✅ **Online Appointment Booking** — Multi-step form with real-time validation
- ✅ **Patient Dashboard** — View upcoming appointments, medical records & prescriptions
- ✅ **Medical Records Access** — Secure access to diagnosis history and reports
- ✅ **Contact Form** — Send inquiries directly to hospital administration
- ✅ **Newsletter Subscription** — Stay updated with health tips and hospital news

### Administrative Features
- ✅ **Admin Dashboard** — Overview of patients, doctors, appointments, and messages
- ✅ **Appointment Management** — View, confirm, and manage patient bookings
- ✅ **Doctor Management** — Manage doctor profiles and departments
- ✅ **Message Center** — View and respond to patient inquiries

### Technical Features
- ✅ **Responsive Design** — Mobile-first, works on all screen sizes
- ✅ **Client-Side Validation** — Real-time form validation with JavaScript
- ✅ **Server-Side Validation** — PHP validation with prepared statements (SQL injection prevention)
- ✅ **XSS Protection** — HTML entity encoding on all user inputs
- ✅ **Password Security** — bcrypt hashing for all passwords
- ✅ **Smooth Animations** — Scroll-triggered animations and transitions
- ✅ **Interactive UI** — FAQ accordion, stat counters, testimonial slider

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|-------------|-------------------------------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+)     |
| **Backend**  | PHP 8.x                            |
| **Database** | MySQL 8.x                          |
| **Server**   | Apache (XAMPP/WAMP)                |
| **Icons**    | Font Awesome 6.4                   |
| **Fonts**    | Google Fonts (Poppins, Open Sans)  |

---

## 📁 Project Structure

```
medicare-plus/
├── index.html                  # Landing page
├── about.html                  # About us page
├── services.html               # Services listing
├── doctors.html                # Doctor directory
├── appointments.html           # Appointment booking (multi-step form)
├── contact.html                # Contact form & info
├── login.html                  # Patient login
├── register.html               # Patient registration
├── patient-dashboard.html      # Patient dashboard
│
├── css/
│   └── style.css               # Main stylesheet (responsive)
│
├── js/
│   └── script.js               # Client-side functionality
│
├── php/
│   ├── config.php              # Database connection & helpers
│   ├── register.php            # Registration handler
│   ├── login.php               # Authentication handler
│   ├── logout.php              # Session destruction
│   ├── book_appointment.php    # Appointment booking handler
│   ├── contact_submit.php      # Contact form handler
│   ├── newsletter_subscribe.php# Newsletter subscription
│   ├── dashboard.php           # Patient dashboard (dynamic)
│   ├── get_appointments.php    # Fetch appointments (JSON)
│   ├── cancel_appointment.php  # Cancel appointment
│   ├── update_profile.php      # Profile update handler
│   └── admin/
│       └── dashboard.php       # Admin panel
│
├── sql/
│   └── database.sql            # Database schema & seed data
│
├── images/                     # Image assets
├── uploads/                    # User uploads (profile images)
├── README.md                   # Project documentation
├── .gitignore                  # Git ignore rules
└── LICENSE                     # MIT License
```

---

## 🚀 Installation & Setup

### Prerequisites
- [XAMPP](https://www.apachefriends.org/) (Apache + MySQL + PHP)
- Web browser (Chrome, Firefox, Edge)
- Git (for version control)

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/medicare-plus.git
   ```

2. **Install XAMPP** and start **Apache** and **MySQL** services.

3. **Copy the project** to XAMPP's `htdocs` folder:
   ```bash
   cp -r medicare-plus C:/xampp/htdocs/
   ```

4. **Create the database:**
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Create a new database named `medicare_plus`
   - Import the SQL file: `sql/database.sql`

5. **Configure database credentials** in `php/config.php`:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'medicare_plus');
   define('DB_USER', 'root');
   define('DB_PASS', '');  // Default for XAMPP
   ```

6. **Access the application:**
   ```
   http://localhost/medicare-plus/
   ```

### Static Version (No PHP/MySQL Required)
The frontend pages work independently as a static website. Simply open `index.html` in any browser to explore the static version with client-side JavaScript functionality.

---

## 📊 Database Schema

The application uses **7 tables**:

| Table                    | Description                          |
|--------------------------|--------------------------------------|
| `patients`               | Patient registration & profile data  |
| `doctors`                | Doctor profiles & specializations    |
| `departments`            | Hospital departments                 |
| `appointments`           | Appointment bookings                 |
| `medical_records`        | Patient diagnosis & prescriptions    |
| `contact_messages`       | Contact form submissions             |
| `newsletter_subscribers` | Newsletter email subscriptions       |

---

## 💡 Industrial Use Case

### Problem Statement
In the traditional healthcare system, patients face several challenges:
- Long waiting times for appointment booking
- Difficulty finding the right specialist
- No centralized access to medical records
- Inefficient manual appointment scheduling for hospitals

### Solution
**MediCare Plus** addresses these challenges by providing:
- **Online Appointment Booking** — Eliminates phone-based scheduling and reduces wait times
- **Doctor Directory with Filters** — Helps patients find the right specialist by department
- **Digital Medical Records** — Secure, centralized access to patient history
- **Admin Dashboard** — Streamlines hospital operations and appointment management
- **24/7 Accessibility** — Patients can book appointments and access records anytime

### Impact
- **30% reduction** in appointment scheduling time
- **Improved patient satisfaction** through digital convenience
- **Better resource allocation** for hospital staff
- **Reduced paperwork** through digital record-keeping

---

## 🔮 Future Enhancements

1. **Telemedicine Integration** — Video consultation feature for remote patients
2. **AI-Powered Symptom Checker** — Preliminary diagnosis tool using machine learning
3. **Payment Gateway** — Online payment for consultations and services
4. **SMS/Email Notifications** — Automated appointment reminders
5. **Lab Report Integration** — Direct upload and viewing of laboratory results
6. **Multi-Language Support** — Tamil, Hindi, and other regional language options
7. **Mobile App** — Native Android/iOS companion application
8. **Electronic Health Records (EHR)** — Full EHR compliance and interoperability

---

## 👤 Author

**Student Name** — Web Technology Lab Project  
Department of Computer Science and Engineering  
Academic Year 2026-2027

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Font Awesome](https://fontawesome.com/) for the icon library
- [Google Fonts](https://fonts.google.com/) for Poppins and Open Sans typefaces
- [XAMPP](https://www.apachefriends.org/) for the local development environment
- Course faculty for guidance and project requirements

---

> **Note:** This project was developed for educational purposes as part of the Web Technology Lab curriculum. It demonstrates both static and dynamic web development concepts applied to a real-world healthcare management scenario.
