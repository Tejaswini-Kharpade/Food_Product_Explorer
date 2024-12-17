import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { fetchCategories, searchProductsByName, fetchProductDetails, searchProductsByCategory, fetchAllProducts } from './FoodApiServices';
import './style.css';

const FoodSearch = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [barcode, setBarcode] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('default');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');
  const [nutritionSortOrder, setNutritionSortOrder] = useState('default');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryList = await fetchCategories();
        setCategories(categoryList);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data with:', { searchQuery, barcode, selectedCategory, page, pageSize, sortOrder, nutritionSortOrder });
      setIsLoading(true);
      try {
        let result = [];
        if (searchQuery) {
          result = await searchProductsByName(searchQuery, page, pageSize);
        } else if (barcode) {
          const productDetail = await fetchProductDetails(barcode);
          result = productDetail ? [productDetail] : [];
        } else if (selectedCategory && selectedCategory !== 'default') {
          result = await searchProductsByCategory(selectedCategory, page, pageSize);
        } else {
          result = await fetchAllProducts(page, pageSize);
        }


        let filteredProducts = [...result];

    if (sortOrder !== 'default') {
      filteredProducts.sort((a, b) => {
        const nameA = (a.product_name || '').toLowerCase();
        const nameB = (b.product_name || '').toLowerCase();
        return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
    }

    setProducts((prevProducts) => (page > 1 ? [...prevProducts, ...filteredProducts] : filteredProducts));

        setHasMore(result.length === pageSize);
      } catch (err) {
        console.error('Error during fetch:', err);
        setError('Failed to fetch products.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, barcode, selectedCategory, page, sortOrder, nutritionSortOrder]); 

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const getCategoriesText = (product) => {
    const categories = product.category || product.categories_tags || product.categories_text || [];
    if (Array.isArray(categories) && categories.length > 0) {
      const cleanedCategories = categories.map((category) => category.replace(/^[a-z]{2}:/, ''));
      return cleanedCategories.join(', ');
    }
    return 'No categories available'; 
  };

  const handleIngredients = (product, productDetail) => {
    const ingredientsTags = productDetail?.ingredients_tags;
    const ingredientsText = product.ingredients_text;

    if (ingredientsTags && Array.isArray(ingredientsTags) && ingredientsTags.length > 0) {
      return ingredientsTags.map((ingredient) => `→${ingredient}`).join(', ') || 'No ingredient details available';
    }  
    if (ingredientsText) {
      return ingredientsText || 'No ingredient details available';
    }  
    return 'No ingredient details available';
  };

  

  return (
    <div className="container">
      <h1 className="food-info-heading">Food Products</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => {
            setBarcode('');
            setSearchQuery(e.target.value);
            setPage(1);
            setProducts([]);
          }}
        />
        <input
          type="text"
          placeholder="Search by product barcode..."
          value={barcode}
          onChange={(e) => {
            setSearchQuery('');
            setBarcode(e.target.value);
            setPage(1);
            setProducts([]);
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSearchQuery('');
            setBarcode('');
            setSelectedCategory(e.target.value);
            setPage(1);
            setProducts([]);
          }}
          className="category-dropdown"

        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}

        </select>

        <select
          value={sortOrder}
          onChange={(e) => {
            console.log('Sort Order Changed to:', e.target.value);  
            setSortOrder(e.target.value);
          }}
          className="sort-dropdown"
        >
          <option value="default">A-Z,Z-A</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select
            value={nutritionSortOrder}
            onChange={(e) => setNutritionSortOrder(e.target.value)}
            className="sort-dropdown-nutri"
            >
            <option value="default">Nutrition Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
        </select>
      </div>

      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.code} className="product-item">
              <Link to={`/product/${product.code}`}>
                <h3>{product.product_name || 'Unnamed Product'}</h3>
                {product.image_url && <img src={product.image_url} alt={product.product_name || 'Product'} />}
                <p><strong>Nutrition Grade: {product.nutrition_grades || 'N/A'}</strong></p>
                <div className="info-box">
                  <h4><strong>Categories</strong></h4>
                  <p>{getCategoriesText(product)}</p>
                </div>
                <div className="info-box">
                  <h4><strong>Ingredients</strong></h4>
                  <p>{handleIngredients(product)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading">No products found. Try adjusting your search or filters.</p>
      )}

      {hasMore && !isLoading && <button onClick={loadMore} className="load-more">Load More</button>}
    </div>
  );
};

export default FoodSearch;
