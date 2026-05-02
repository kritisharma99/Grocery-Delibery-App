# 🛒 Grocery Delivery Web Application

A fully responsive grocery delivery web application built from a mobile-first Figma design. This project demonstrates real-world frontend architecture, state management using Zustand, and scalable UI development using React, TypeScript, and Tailwind CSS.

---

## 🔗 Live Demo

[👉 _Live_](https://grocery-delibery-app.vercel.app/)

## 📂 GitHub Repository

[👉 _Github Link_](https://github.com/kritisharma99/Grocery-Delibery-App/)

---

## 📱 Figma Reference (Mandatory)

This project is strictly implemented based on the provided Figma design:

👉 https://www.figma.com/design/mI1gLnfy9eSvMg6I6TCPJY/Frontend-Grocery-App-Test

- All screens, flows, and UI decisions are derived from this design.
- Mobile-first approach followed exactly as per Figma.
- Desktop UI is custom-designed while maintaining UX consistency.

---

## 🎯 Objective

Convert a mobile grocery delivery app design into a **fully responsive production-ready web application**, focusing on:

- Scalable frontend architecture
- Efficient global state management
- Pixel-accurate UI implementation
- Responsive design principles

---

## ⚙️ Tech Stack

### ✅ Mandatory

- **React** (Vite / Next.js)
- **TypeScript (Strict Mode)**
- **Tailwind CSS**
- **Zustand** (State Management)
- **React Router** (if applicable)

### ❌ Not Used

- Redux / MobX / Context API
- UI Libraries (MUI, AntD, Chakra, etc.)
- Inline CSS styles

---

## 🚀 Features

### 🔐 Authentication & Onboarding

- Splash Screen
- Onboarding / Welcome Screen
- Login & Sign Up
- OTP / Verification Flow
- Location Selection

### 🏠 Main Application

- Home Screen
- Category-Based Product Listing
- Product Details Page
- Search with Debouncing
- Filters & Sorting
- Favorites (Wishlist)
- Cart Management

### 💳 Checkout Flow

- Order Success Screen
- Order Failure / Error Handling

---

## 🧠 State Management (Zustand)

Structured using multiple stores for scalability:

- **Auth Store** → user authentication & session
- **Product Store** → products, categories, filters
- **Cart Store** → cart items, quantity, pricing
- **UI Store** → loaders, modals, global UI states

---

## 📊 Data Handling

- Mock JSON data used for:
  - Products
  - Categories

- API calls simulated using `setTimeout`
- Static assets used for images

---

## 🎨 UI & Styling (Tailwind CSS)

- Utility-first approach
- No custom CSS (except minimal cases)
- Responsive breakpoints:
  - `sm`, `md`, `lg`, `xl`

- Consistent spacing, typography, and color system

---

## 📱 Responsive Design

### ✅ Mobile (Primary Focus)

- Pixel-perfect implementation from Figma
- Bottom navigation
- Card-based layouts
- Smooth flows & interactions

### 💻 Desktop (Custom Designed)

- Max container width: `max-w-7xl`
- Product grid (min 4 columns)
- Sidebar for categories & filters
- Sticky cart summary in checkout
- Proper spacing (not stretched mobile UI)

---

## ✨ UX Enhancements (Bonus)

- Skeleton loaders for async states
- Empty states (Cart, Search, Favorites)
- Error handling UI
- Debounced search input
- Basic keyboard accessibility
- Smooth transitions & animations

---

## 📦 TypeScript Usage

- Strict typing enforced (no `any`)
- Interfaces:
  - `Product`
  - `CartItem`
  - `User`

- Enums:
  - `OrderStatus`
  - `ProductCategory`

---

## 🛠️ Setup Instructions

```bash
# Clone the repository
git clone <your-repo-link>

# Navigate to project
cd grocery-app

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📁 Folder Structure (Example)

```
src/
│── components/
│── pages/
│── stores/        # Zustand stores
│── types/         # TypeScript interfaces & enums
│── data/          # Mock JSON data
│── hooks/
│── utils/
│── assets/
```

---

## 🚀 Deployment

- Deployed on **Vercel / Netlify**
- Optimized for performance and responsiveness

---

## ✅ Evaluation Highlights

- Clean and scalable architecture
- Proper state separation using Zustand
- Pixel-accurate Figma implementation
- Strong responsive design handling
- Type-safe codebase

---

## 📌 Notes

- This project is frontend-only (no backend).
- Focus is on UI/UX, state management, and responsiveness.
- Designed with production-level practices in mind.

---

## 🙌 Author

**Kriti Sharma**

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub and feel free to fork it!
