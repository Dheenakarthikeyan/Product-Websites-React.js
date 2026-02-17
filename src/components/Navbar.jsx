import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Moon, Sun, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const Navbar = () => {
    const { cartItems } = useCart();
    const { theme, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${searchQuery}`);
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo & Brand */}
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform">
                        ShopZone
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8 relative group">
                        <input
                            type="text"
                            placeholder="Search essentials, fashion, and more..."
                            className="w-full px-5 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 border-2 focus:border-blue-500 dark:text-white transition-all outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                            <Search size={20} />
                        </button>
                    </form>

                    {/* Navigation - Desktop */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                        <Link to="/categories" className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Categories</Link>
                        <Link to="/orders" className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Orders</Link>

                        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>

                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
                            <ShoppingCart size={20} />
                            {cartItems.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
                            <User size={20} />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex md:hidden items-center space-x-4">
                        <Link to="/cart" className="relative text-gray-700 dark:text-gray-300">
                            <ShoppingCart size={24} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-gray-300">
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 absolute w-full left-0 px-4 py-4 shadow-lg animate-in slide-in-from-top-2">
                    <form onSubmit={handleSearch} className="mb-4 relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent dark:text-white outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
                    </form>
                    <div className="flex flex-col space-y-3">
                        <Link to="/" className="text-gray-700 dark:text-gray-300 py-2 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/categories" className="text-gray-700 dark:text-gray-300 py-2 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Categories</Link>
                        <Link to="/orders" className="text-gray-700 dark:text-gray-300 py-2 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Orders</Link>
                        <Link to="/profile" className="text-gray-700 dark:text-gray-300 py-2 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Appearance</span>
                            <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
