export const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async (limit = 0, skip = 0) => {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    return response.json();
};

export const fetchProduct = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return response.json();
};

export const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    return response.json();
};

export const fetchProductsByCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    return response.json();
};

export const searchProducts = async (query) => {
    const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
    return response.json();
};
