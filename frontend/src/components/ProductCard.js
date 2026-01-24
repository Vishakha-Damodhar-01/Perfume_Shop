import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // 1. Ensure we access the first image in the array from your MongoDB
  // 2. Added a fallback check to prevent the app from crashing if images are missing
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/300?text=No+Image';

  return (
    <div className="perfume-card">
      <div className="image-container">
        <img src={imageUrl} alt={product.name} />
        <div className="overlay">
          <button className="view-btn" onClick={() => navigate(`/product/${product._id}`)}>
            VIEW DETAILS
          </button>
        </div>
      </div>
      <div className="card-info">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
      </div>
    </div>
  );

};

export default ProductCard;
