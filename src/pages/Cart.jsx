import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, total } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center text-center px-4">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-full shadow-lg mb-6 animate-bounce">
                    <Trash2 size={64} className="text-gray-300 dark:text-gray-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Browse our products and find something you love!</p>
                <Link to="/categories" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
                    Start Shopping <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart ({cartItems.length})</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="lg:w-2/3 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up">
                                <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-lg p-2 flex-shrink-0">
                                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <Link to={`/product/${item.id}`} className="font-bold text-gray-900 dark:text-white hover:text-blue-600 text-lg line-clamp-1">{item.title}</Link>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{item.category}</p>
                                    <div className="font-bold text-blue-600 mt-2 text-xl">₹{item.price}</div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:text-red-500 disabled:opacity-50 transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="mx-3 font-semibold w-6 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:text-green-500 transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                        title="Remove item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 px-6 py-2 rounded-lg font-medium transition-colors w-fit"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Tax (5%)</span>
                                    <span>₹{(total * 0.05).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-2xl font-bold text-gray-900 dark:text-white mb-8 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <span>Total</span>
                                <span>₹{(total * 1.05).toFixed(2)}</span>
                            </div>

                            <button
                                onClick={() => alert("Checkout functionality coming soon!")}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2"
                            >
                                Proceed to Checkout <ArrowRight size={20} />
                            </button>

                            <div className="mt-6 flex justify-center gap-4 text-gray-400">
                                {/* Secure Payment Icons Mock */}
                                <div className="h-6 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                <div className="h-6 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                <div className="h-6 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
