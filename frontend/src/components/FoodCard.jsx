import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPlus, FiCheck } from 'react-icons/fi';
import './FoodCard.css';

const FoodCard = ({ food }) => {
  const { user, updateCartCount } = useAuth();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setAdding(true);
    try {
      const res = await axios.post('/api/cart/add', { foodId: food._id, quantity: 1 });
      const items = res.data.items || [];
      updateCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (error) {
      console.error('Add to cart error:', error);
    }
    setAdding(false);
  };

  return (
    <div className="food-card glass-card">
      <div className="food-card-image">
        {imageLoading && <div className="food-card-image-loading">Loading...</div>}
        {imageError ? (
          <div className="food-card-image-error">
            <div className="error-icon">🍽️</div>
            <p>Image not available</p>
          </div>
        ) : (
          <img 
            src={food.image} 
            alt={food.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        )}
        <div className="food-card-category">{food.category}</div>
      </div>
      <div className="food-card-body">
        <h3 className="food-card-name">{food.name}</h3>
        {food.description && (
          <p className="food-card-desc">{food.description}</p>
        )}
        <div className="food-card-footer">
          <span className="food-card-price">₹{food.price}</span>
          <button
            className={`food-card-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={adding}
          >
            {added ? <><FiCheck /> Added</> : <><FiPlus /> Add to Cart</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
