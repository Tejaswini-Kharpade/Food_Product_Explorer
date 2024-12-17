import React, { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import { fetchProductDetails } from './FoodApiServices';
import './style.css';

const ProductDetail = () => {
  const { barcode } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  

  useEffect(() => {
    const loadProductDetail = async () => {
      setIsLoading(true);
      try {
        const result = await fetchProductDetails(barcode);
        setProductDetail(result);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProductDetail();
  }, [barcode]);

  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const renderIngredients = () => {
    // Use ingredients_text if available; otherwise, fallback to processed ingredients_tags
    const ingredientsText = productDetail.ingredients_text;

    if (ingredientsText) {
      return <p>{ingredientsText}</p>;
    }

    if (!productDetail.ingredients_tags) {
      return <p>N/A</p>;
    }

    const ingredients = productDetail.ingredients_tags.map(tag =>
      tag.replace(/^[a-z]{2}:/, '').replace(/-/g, ' ')
    );

    return <p>{ingredients.join(', ')}</p>;
  };

  const renderNutritionalTable = () => {
    const nutrients = productDetail.nutriments || {};

    // Extract key nutritional information
    const keyNutrients = {
      energy_value: 'Energy (kcal)',
      fat_value: 'Fat (g)',
      saturated_fat_value: 'Saturated Fat (g)',
      carbohydrates_value: 'Carbohydrates (g)',
      sugars_value: 'Sugars (g)',
      proteins_value: 'Protein (g)',
      salt_value: 'Salt (g)',
    };

    const filteredNutrients = Object.keys(keyNutrients)
      .filter((key) => key in nutrients)
      .map((key) => ({
        name: keyNutrients[key],
        value: nutrients[key],
      }));

    if (filteredNutrients.length === 0) {
      return <p>Nutritional values not available</p>;
    }

    return (
      <table className="nutrition-table">
        <thead>
          <tr>
            <th>Nutrient</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredNutrients.map((nutrient) => (
            <tr key={nutrient.name}>
              <td>{nutrient.name}</td>
              <td>{nutrient.value} g</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="product-detail-container">

      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back
      </button>
      
      <div className="left-section">
        <img
          src={productDetail.image_url}
          alt={productDetail.product_name || 'Unnamed Product'}
          className="product-detail-image"
        />
      </div>

      <div className="middle-section">
        <h2>
          <strong style={{ fontSize: '1.2em' }}>
          {`${productDetail.product_name || 'Unnamed Product'} - ${productDetail.brands || 'Unknown Brand'} - ${productDetail.quantity || 'Unknown Quantity'}`}
          </strong>
        </h2>

        <div className="ingredients-labels">
          <p><strong>Ingredients:</strong></p>
          {renderIngredients()}

          <div style={{ margin: '1rem 0' }}></div>


          <p><strong>Labels:</strong></p>
          <ul>
            {productDetail.ingredients_analysis_tags?.map((label) => (
              <li key={label}>
                <i className="arrow-icon">&#8594;</i>
                <span>{label.replace(/^[a-z]{2}:/, '').replace(/-/g, ' ')}</span>
              </li>
            )) || <li>N/A</li>}
          </ul>
        </div>
      </div>

      <div className="right-section">
        <p className="nutrition-info"><strong>Nutritional Values:</strong></p>
        {renderNutritionalTable()}
      </div>
    </div>
  );
};

export default ProductDetail;
