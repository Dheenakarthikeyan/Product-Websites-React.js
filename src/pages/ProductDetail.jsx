import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct } from '../utils/api';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, Truck, ShieldCheck, ArrowLeft, Minus, Plus } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProduct(id);
                setProduct(data);
                setSelectedImage(0); // Reset to first image
            } catch (error) {
                console.error("Failed to load product", error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
        </div>
    );

    if (!product) return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <Link to="/categories" className="text-blue-600 hover:underline">Back to products</Link>
        </div>
    );

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-24 pb-12 transition-colors">
            <div className="container mx-auto px-4">
                <Link to="/categories" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Products
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
                        {/* Image Gallery */}
                        <div className="p-8 bg-gray-100 dark:bg-gray-900/50 flex flex-col items-center justify-center">
                            <div className="relative w-full aspect-square mb-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-inner flex items-center justify-center overflow-hidden">
                                <img
                                    src={product.images ? product.images[selectedImage] || product.thumbnail : product.thumbnail}
                                    alt={product.title}
                                    className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2 w-full justify-center hide-scrollbar">
                                {product.images?.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-20 h-20 bg-white dark:bg-gray-800 border-2 rounded-xl p-2 flex-shrink-0 transition-all ${selectedImage === idx ? 'border-blue-600 scale-105' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}
                                    >
                                        <img src={img} alt={`View ${idx}`} className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Values */}
                        <div className="p-8 md:p-12 flex flex-col">
                            <div className="mb-2">
                                <span className="text-blue-600 font-bold tracking-wider uppercase text-xs bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center text-amber-400">
                                    <Star fill="currentColor" size={20} />
                                    <span className="ml-1 text-gray-700 dark:text-gray-300 font-bold text-lg">{product.rating}</span>
                                </div>
                                <span className="text-gray-400 px-2 border-l border-gray-300 dark:border-gray-700">
                                    {product.reviews?.length || 0} Reviews
                                </span>
                                <span className={product.stock > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6 flex items-end gap-3">
                                ₹{product.price}
                                {product.discountPercentage > 0 && (
                                    <span className="text-lg text-gray-400 line-through font-normal mb-1">
                                        ₹{(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 flex-grow">
                                {product.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                    <Truck size={20} />
                                    <span className="text-sm">Free Delivery</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                    <ShieldCheck size={20} />
                                    <span className="text-sm">2 Year Warranty</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 dark:border-gray-700 pt-8 mt-auto">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-3 w-fit">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-1 hover:text-blue-600 transition-colors"
                                        >
                                            <Minus size={20} />
                                        </button>
                                        <span className="mx-4 font-bold text-lg min-w-[20px] text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-1 hover:text-blue-600 transition-colors"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                                    >
                                        <ShoppingCart size={24} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                {product.reviews && product.reviews.length > 0 && (
                    <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm">
                        <h3 className="text-2xl font-bold mb-6 dark:text-white">Customer Reviews</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {product.reviews.map((review, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                                    <div className="flex items-center mb-3">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300 dark:text-gray-700"} />
                                            ))}
                                        </div>
                                        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(review.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="font-semibold mb-2 dark:text-white">{review.reviewerName}</p>
                                    <p className="text-gray-600 dark:text-gray-300 italic">"{review.comment}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
