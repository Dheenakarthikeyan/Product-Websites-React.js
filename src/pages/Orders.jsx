import { Package, Truck, CheckCircle, Smartphone, Clock } from 'lucide-react';

const Orders = () => {
    const orders = [
        {
            id: 'ORD-8921-XJ',
            date: '2024-02-15',
            status: 'Delivered',
            total: 249.99,
            items: 2,
            image: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
        },
        {
            id: 'ORD-3321-MK',
            date: '2024-02-18',
            status: 'Processing',
            total: 89.50,
            items: 1,
            image: 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg'
        },
        {
            id: 'ORD-1102-PP',
            date: '2024-01-20',
            status: 'Cancelled',
            total: 12.00,
            items: 1,
            image: 'https://cdn.dummyjson.com/product-images/5/thumbnail.jpg'
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
            case 'Processing': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
            case 'Cancelled': return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return <CheckCircle size={16} />;
            case 'Processing': return <Clock size={16} />;
            case 'Cancelled': return <Smartphone size={16} />; // Just a placeholder
            default: return <Package size={16} />;
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-24 pb-12 transition-colors">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                    <Package className="text-blue-600" /> My Orders
                </h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order Placed</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</p>
                                        <p className="font-medium text-gray-900 dark:text-white">₹{order.total.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</p>
                                        <p className="font-mono text-gray-600 dark:text-gray-300">{order.id}</p>
                                    </div>
                                </div>
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-bold hover:underline">
                                    View Invoice
                                </button>
                            </div>

                            <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
                                <div className="h-24 w-24 bg-gray-100 rounded-lg flex-shrink-0">
                                    <img src={order.image} alt="Product" className="w-full h-full object-cover rounded-lg mix-blend-multiply dark:mix-blend-normal" />
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)} {order.status}
                                        </span>
                                        {order.status === 'Delivered' &&
                                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                <Truck size={14} /> Delivered on {new Date(order.date).toLocaleDateString()}
                                            </span>
                                        }
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Premium Product Bundle x{order.items}</h3>
                                    <p className="text-gray-500 text-sm mt-1">Sold by ShopZone Retail Pvt Ltd.</p>
                                </div>
                                <div className="flex flex-col gap-2 w-full sm:w-auto">
                                    <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm">
                                        Buy Again
                                    </button>
                                    <button className="w-full sm:w-auto px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
