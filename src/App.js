import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FoodSearch from './FoodSearch'; 
import ProductDetail from './ProductDetail'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodSearch />} />
        <Route path="/product/:barcode" element={<ProductDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;