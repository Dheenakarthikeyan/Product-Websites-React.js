import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200 font-sans">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<ProductList />} />
              <Route path="/categories/:categorySlug" element={<ProductList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={
                <div className="pt-32 text-center">
                  <h1 className="text-4xl font-bold mb-4">My Profile</h1>
                  <p className="text-gray-500">Feature coming soon...</p>
                </div>
              } />
            </Routes>
            <footer className="bg-white dark:bg-gray-900 py-12 mt-12 border-t border-gray-100 dark:border-gray-800">
              <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
                <p>&copy; 2024 ShopZone. All rights reserved.</p>
                <div className="flex justify-center space-x-6 mt-4">
                  <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
