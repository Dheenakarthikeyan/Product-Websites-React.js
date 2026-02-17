import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { fetchProducts, fetchProductsByCategory, searchProducts, fetchCategories } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

const ProductList = () => {
    const { categorySlug } = useParams();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState(2000);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            const cats = await fetchCategories();
            setCategories(cats);
        };
        loadCategories();
    }, []);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                let data;
                if (searchQuery) {
                    data = await searchProducts(searchQuery);
                } else if (categorySlug) {
                    data = await fetchProductsByCategory(categorySlug);
                } else {
                    data = await fetchProducts(100); // Fetch more for "All"
                }
                setProducts(data.products);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [categorySlug, searchQuery]);

    // Derived state for filtering and sorting
    const filteredProducts = products
        .filter(p => p.price <= priceRange)
        .sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating; // high to low
            return 0;
        });

    return (
        <div className="container mx-auto px-4 py-8 pt-24 min-h-screen">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className={`md:w-64 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-fit ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg dark:text-white">Filters</h3>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500">Close</button>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-8">
                        <h4 className="font-semibold mb-3 dark:text-gray-200">Max Price: ₹{priceRange}</h4>
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>₹0</span>
                            <span>₹2000+</span>
                        </div>
                    </div>

                    {/* Categories List */}
                    <div>
                        <h4 className="font-semibold mb-3 dark:text-gray-200">Categories</h4>
                        <ul className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin">
                            <li>
                                <Link to="/categories" className={`block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${!categorySlug ? 'text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-400'}`}>
                                    All Categories
                                </Link>
                            </li>
                            {categories.map((cat, idx) => {
                                const catName = typeof cat === 'object' ? cat.name : cat;
                                const catSlug = typeof cat === 'object' ? cat.slug : cat;
                                return (
                                    <li key={idx}>
                                        <Link
                                            to={`/categories/${catSlug}`}
                                            className={`block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 capitalize ${categorySlug === catSlug ? 'text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-400'}`}
                                        >
                                            {catName}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Header: Title & Sort */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <h1 className="text-2xl font-bold dark:text-white capitalize">
                            {categorySlug ? categorySlug.replace('-', ' ') : (searchQuery ? `Search: "${searchQuery}"` : 'All Products')}
                        </h1>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="md:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg shadow-sm"
                            >
                                <Filter size={18} /> Filters
                            </button>

                            <div className="relative flex-1 sm:flex-none">
                                <select
                                    className="w-full sm:w-48 appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="default">Sort by: Featured</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                <div key={n} className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-80 animate-pulse"></div>
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <h3 className="text-2xl font-bold text-gray-400">No products found</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
                            <button onClick={() => { setPriceRange(2000); setSortBy('default'); }} className="mt-4 text-blue-600 font-bold hover:underline">
                                Reset Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductList;
