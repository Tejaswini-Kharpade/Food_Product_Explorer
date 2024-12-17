import axios from 'axios';


const fetchAllProducts = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', {
      params: { search_terms: '', json: true, page, page_size: pageSize },
    });
    return response.data.products || [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

const searchProductsByCategory = async (category, page, pageSize) => {
  try {
    const response = await axios.get(`https://world.openfoodfacts.org/category/${category}.json`, {
      params: {
        json: true,
        page: page,
        page_size: pageSize,
      },
    });
    return response.data.products || [];
  } catch (error) {
    console.error('Error searching products by category:', error);
    return [];
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get('https://world.openfoodfacts.org/categories.json');
    const categories = response.data.tags.map((tag) => tag.name).slice(0, 20); 
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const searchProductsByName = async (name) => {
  try {
    const response = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl`, {
      params: { search_terms: name, json: true },
    });
    return response.data.products || [];
  } catch (error) {
    console.error('Error searching products by name:', error);
    return [];
  }
};

const fetchProductDetails = async (barcode) => {
  try {
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    return response.data.product || null;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
};



export { fetchAllProducts , fetchCategories, searchProductsByName, fetchProductDetails , searchProductsByCategory};


