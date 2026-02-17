import { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories } from '../utils/api'; // fetchCategories to show some categories
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // limiting to top 6
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    fetchProducts(8), // Fetch 8 featured products
                    fetchCategories()
                ]);
                setProducts(productsData.products);
                setCategories(categoriesData.slice(0, 6)); // Top 6 categories
            } catch (error) {
                console.error("Failed to load data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-24 px-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up tracking-tight">
                        Experience the Future of Shopping
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90 animate-fade-in-up delay-100 font-light">
                        Discover top-rated products, exclusive deals, and express delivery right to your doorstep.
                    </p>
                    <div className="flex justify-center gap-4 animate-fade-in-up delay-200">
                        <Link to="/categories" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-xl flex items-center gap-2">
                            Shop Now <ArrowRight size={20} />
                        </Link>
                        <Link to="/orders" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-transform transform hover:scale-105 flex items-center gap-2">
                            View Orders
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
                    <Link to="/categories" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group">
                        View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            to={`/categories/${cat.slug || cat.name || cat}`} // Handle dummyjson format (might be objects or strings depending on version)
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center gap-3 text-center group"
                        >
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Star size={24} />
                            </div>
                            <span className="font-medium text-gray-700 dark:text-gray-300 capitalize group-hover:text-blue-600 transition-colors">
                                {typeof cat === 'object' ? cat.name : cat}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="bg-white dark:bg-gray-800 py-16 transition-colors">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Trending Now</h2>
                        <p className="text-gray-500 dark:text-gray-400">Handpicked items just for you</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/categories" className="inline-flex items-center gap-2 px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Load More Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter or Promo */}
            <section className="container mx-auto px-4 py-16">
                <div className="bg-gray-900 dark:bg-indigo-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Exclusive Club</h2>
                        <p className="text-gray-300 mb-8 max-w-lg mx-auto">Get 20% off your first order and early access to new arrivals.</p>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="button" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-colors shadow-lg">
                                Subscribe
                            </button>
                        </form>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
                </div>
            </section>
        </div>
    );
};

export default Home;
