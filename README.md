# 🌟 Digital Life Lessons

**Live Site:** [https://the-inner-circle-55b1a.web.app/]  
**Platform Theme:** A sanctuary for preserving personal wisdom and sharing life's most meaningful insights.

---

## 📖 Introduction
People often learn valuable lessons but forget them over time. **Digital Life Lessons** is a comprehensive platform where users can create, organize, and explore life-changing wisdom. Built with a robust full-stack architecture, it offers a seamless experience for personal reflection and community learning.

## 🚀 Key Features

-   **Plan-Based Visibility:** Content is protected by "Free" and "Premium" access levels. Premium content features a professional blur-effect preview for non-paid users.
-   **Interactive Engagement:** Real-time Like/Unlike system, Favorite lists, and an integrated Reporting system for community moderation.
-   **Advanced Discovery:** Robust filtering by 5+ categories, 4+ emotional tones, and keyword-based search.
-   **Stripe Integration:** Secure lifetime premium upgrade via Stripe Payment Gateway.
-   **Community Growth:** Social media sharing using `react-share` and interactive comment sections.
-   **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop with a modern Glassmorphism UI.

## 🛠️ Tech Stack & Dependencies
-   **Core:** React 19, React Router 7, Tailwind CSS 4.
-   **Data Fetching:** TanStack Query (React Query) for caching and performance.
-   **Form & Validation:** React Hook Form for optimized data entry.
-   **UI & UX:** -   `framer-motion` & `Lottie React` for smooth animations.
    -   `Swiper` for dynamic hero sliders.
    -   `Recharts` for dashboard analytics visualization.
    -   `SweetAlert2` & `React Toastify` for professional feedback.

---

## 🖥️ Dashboard Overview

### 👤 User Dashboard
-   **Home:** Quick overview of total lessons, favorites, and activity charts.
-   **Add Lesson:** A secure form to create lessons with Title, Story, Category, Emotional Tone, and Image. (Premium level is restricted to upgraded users).
-   **My Lessons:** Tabular view to edit, delete, or toggle visibility (Public/Private) and access levels.
-   **My Favorites:** A curated collection of saved wisdom with filtering options.
-   **Profile:** Manage personal info, view a grid of all self-created public lessons, and "Premium ⭐" badge.

### 🛡️ Admin Dashboard
-   **Overview:** Platform-wide analytics (Total users, Lessons, and growth graphs).
-   **User Management:** Monitor all registered users and promote/manage roles.
-   **Manage Lessons:** Review all platform content, mark featured lessons, and delete inappropriate entries.
-   **Report Logs:** Tabular list of community-flagged lessons with reasons; Admin can delete or ignore reports.

---

## 📦 Installation & Setup

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/digital-life-lessons-client.git](https://github.com/your-username/digital-life-lessons-client.git)
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file and add your Firebase and Stripe keys:
    ```env
    VITE_apiKey=your_api_key
    VITE_authDomain=your_auth_domain
    ...
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

## 📜 Dependencies
`@tanstack/react-query`, `firebase`, `framer-motion`, `axios`, `react-router`, `react-share`, `sweetalert2`, `swiper`, `recharts`, `tailwindcss`.