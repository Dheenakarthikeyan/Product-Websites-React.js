import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, Plus, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
            <div className="relative pt-[100%] bg-gray-50 dark:bg-gray-900 overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out"
                    loading="lazy"
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                    }}
                    className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10"
                    aria-label="Add to cart"
                >
                    <Plus size={20} />
                </button>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full uppercase tracking-wide">
                        {product.category}
                    </span>
                    <div className="flex items-center text-amber-400 text-sm font-medium">
                        <Star size={14} fill="currentColor" />
                        <span className="ml-1 text-gray-600 dark:text-gray-400">{product.rating}</span>
                    </div>
                </div>

                <Link to={`/product/${product.id}`} className="block group-hover:text-blue-600 transition-colors mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-1" title={product.title}>
                        {product.title}
                    </h3>
                </Link>

                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through">₹{(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}</span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors md:hidden"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
