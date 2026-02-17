# Modern E-commerce App

A modern, responsive e-commerce web application built with React and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach, fully responsive layouts.
- **Dark Mode**: Toggle between light and dark themes.
- **Product Catalog**: Browse products by category or search.
- **Product Details**: View detailed product information, images, and reviews.
- **Shopping Cart**: Add items, adjust quantities, and view order summary.
- **Order History**: View past orders (mock data).
- **Filtering & Sorting**: Filter by price/category and sort by price/rating.
- **State Management**: Uses Context API for global state (Cart, Theme).

## Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Data**: DummyJSON API

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Folder Structure

- `src/components`: Reusable UI components (Navbar, ProductCard, etc.)
- `src/pages`: Page components (Home, ProductList, ProductDetail, Cart, Orders)
- `src/context`: Global state management (CartContext, ThemeContext)
- `src/utils`: Helper functions and API services
