import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  
  // State to handle the new review form inputs
  const [reviewForm, setReviewForm] = useState({
    username: '',
    comment: ''
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]); 
        }
      })
      .catch(err => console.error("Database fetch error:", err));
  }, [id]);

  // Function to send the review to MongoDB
  const submitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.username || !reviewForm.comment) return alert("Please fill all fields");

    try {
      const response = await fetch(`http://localhost:5000/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id, // Linking to the current perfume ID
          username: reviewForm.username,
          comment: reviewForm.comment,
          rating: 5 // Default rating as per your schema
        })
      });

      if (response.ok) {
        alert("Review posted successfully!");
        setReviewForm({ username: '', comment: '' }); // Clear form
        window.location.reload(); // Refresh to see the new review
      }
    } catch (err) {
      console.error("Error posting review:", err);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this fragrance: ${product?.name}`;
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`
    };
    window.open(links[platform], '_blank');
  };

  if (!product) return <div className="loading">Loading Perfume...</div>;

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="gallery-section">
          <div className="main-img-container">
            <img src={mainImage} alt={product.name} />
          </div>
          <div className="thumbnail-grid">
            {product.images?.map((img, index) => (
              <img 
                key={index} src={img} alt="thumbnail" 
                onClick={() => setMainImage(img)}
                className={mainImage === img ? 'active-thumb' : ''}
              />
            ))}
          </div>
        </div>

        <div className="details-section">
          <h1 className="brand-title">BELLA VITA LUXURY</h1>
          <h2 className="product-name">{product.name}</h2>
          <p className="price">₹{product.price}</p>
          <p className="full-description">{product.description}</p>
          
          <div className="action-row">
            <button className="add-to-cart">Add to Cart</button>
            <div className="share-btns">
               <button onClick={() => handleShare('twitter')}>Twitter</button>
               <button onClick={() => handleShare('whatsapp')}>WhatsApp</button>
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Reviews Section */}
      <section className="reviews-section">
        <h3>Customer Reviews</h3>
        
        {/* List of existing reviews from MongoDB */}
        <div className="reviews-list">
          {product.productReviews?.length > 0 ? (
            product.productReviews.map((rev) => (
              <div key={rev._id} className="review-card">
                <strong>{rev.username}</strong>
                <p>{rev.comment}</p>
              </div>
            ))
          ) : (
            <p>please share your experience!</p>
          )}
        </div>

        {/* Form to add a new review */}
        <div className="add-review-form">
          <h4>Leave a Review</h4>
          <form onSubmit={submitReview}>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={reviewForm.username}
              onChange={(e) => setReviewForm({...reviewForm, username: e.target.value})}
            />
            <textarea 
              placeholder="What do you think of this scent?" 
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
            ></textarea>
            <button type="submit" className="submit-rev-btn">POST REVIEW</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
