import { useState, useEffect } from 'react';
import axios from 'axios';
import FoodCard from './FoodCard';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './TrendingSection.css';

const TrendingSection = () => {
  const [trendingItems, setTrendingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('/api/food');
        // Pick 4 random or top items for trending
        setTrendingItems(res.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching trending foods:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  if (loading) return null;
  if (trendingItems.length === 0) return null;

  return (
    <section className="trending-section section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Trending <span>Dishes</span></h2>
            <p className="section-subtitle">The most loved flavors by our community right now</p>
          </div>
          <button className="view-all-btn" onClick={() => navigate('/menu')}>
            Explore Full Menu <FiArrowRight />
          </button>
        </div>

        <div className="trending-grid">
          {trendingItems.map((food, index) => (
            <div key={food._id} className="trending-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <FoodCard food={food} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
