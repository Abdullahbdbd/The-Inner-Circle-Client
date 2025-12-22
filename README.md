# 🌟 Digital Life Lessons | Preserve & Share Human Wisdom

**Live Site:** [Your Live Link Here](https://your-project-link.web.app)

Digital Life Lessons is a modern full-stack web application designed to help users document, organize, and share meaningful life lessons, personal growth insights, and gathered wisdom. From private reflections to premium community insights, this platform serves as a digital sanctuary for personal development.

## 🚀 Key Features

-   **Dual-Tier Content System:** Lessons are categorized into Free and Premium tiers. Premium content remains exclusive to upgraded members, with a sleek blur-effect preview for free users.
-   **Interactive Dashboard:** Separate, feature-rich dashboards for Admins (to moderate and analyze) and Users (to manage their personal contributions).
-   **Dynamic Discovery:** Advanced search, filtering by emotional tone (Motivational, Gratitude, etc.), and category-based sorting to find the right wisdom at the right time.
-   **Secure Payments:** Integrated with **Stripe** for seamless one-time lifetime premium upgrades.
-   **Community Engagement:** React to lessons, leave meaningful comments, report inappropriate content, and share wisdom directly to social media using **React Share**.

## 🛠️ Tech Stack

-   **Frontend:** React 19, React Router 7, Tailwind CSS 4 (Vite)
-   **State Management:** TanStack Query (React Query)
-   **Authentication:** Firebase Auth (Google & Email/Password)
-   **Animations:** Framer Motion & Lottie React
-   **Form Handling:** React Hook Form
-   **Notifications:** SweetAlert2 & React Toastify

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