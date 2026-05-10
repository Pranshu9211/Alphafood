import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FoodCard from '../components/FoodCard';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import './Menu.css';

const categories = ['All', 'Pizza', 'Burger', 'Drinks', 'Desserts', 'Indian Food', 'Fast Food'];

const PREVIEW_COUNT = 8; // Number of cards to show in preview

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const res = await axios.get('/api/food');
        setFoods(res.data);
        setFiltered(res.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
      setLoading(false);
    };

    loadFoods();
  }, []);

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    filterFoods(category, searchQuery);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterFoods(activeCategory, query);
  };

  const filterFoods = (category, query) => {
    let result = foods;
    if (category !== 'All') {
      result = result.filter(f => f.category === category);
    }
    if (query) {
      result = result.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
    }
    setFiltered(result);
  };

  const toggleMenuExpand = () => {
    setMenuExpanded(prev => !prev);
    if (menuExpanded) {
      // Scroll back to menu section top when collapsing
      if (menuRef.current) {
        const navHeight = 70;
        const top = menuRef.current.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  // Decide which items to show
  const displayedItems = menuExpanded ? filtered : filtered.slice(0, PREVIEW_COUNT);

  return (
    <div className="menu-page">
      {/* Page Hero */}
      <div className="page-hero">
        <h1>Discover Our <span>Menu</span></h1>
        <p>Explore a world of vibrant flavors crafted to satisfy every craving</p>
      </div>

      <div className="container">
        <section
          className={`menu-section section ${menuExpanded ? 'menu-expanded' : 'menu-preview'}`}
          id="menu"
          ref={menuRef}
        >
          {/* Search bar */}
          <div className="menu-search-wrapper">
            <input
              type="text"
              className="menu-search-input"
              placeholder="Search for dishes, ingredients..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Category filters */}
          <div className={`category-filters ${menuExpanded ? 'filters-visible' : 'filters-visible'}`}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(cat)}
              >
                {cat === 'All' && '🍽️'} {cat === 'Pizza' && '🍕'} {cat === 'Burger' && '🍔'}
                {cat === 'Drinks' && '🥤'} {cat === 'Desserts' && '🍰'} {cat === 'Indian Food' && '🍛'}
                {cat === 'Fast Food' && '🍟'} {cat}
              </button>
            ))}
          </div>

          {/* Food grid */}
          {loading ? (
            <div className="food-grid">
              {[...Array(PREVIEW_COUNT)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton" style={{ height: 200 }}></div>
                  <div style={{ padding: 18 }}>
                    <div className="skeleton" style={{ height: 20, marginBottom: 10 }}></div>
                    <div className="skeleton" style={{ height: 14, width: '60%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="no-results">
              <span className="no-results-emoji">😕</span>
              <h3>No food items found</h3>
              <p>Try a different search or category</p>
            </div>
          ) : (
            <>
              <div className={`food-grid ${menuExpanded ? 'grid-expanded' : 'grid-preview'}`}>
                {displayedItems.map((food, index) => (
                  <div key={food._id} className="food-grid-item" style={{ animationDelay: `${index * 0.05}s` }}>
                    <FoodCard food={food} />
                  </div>
                ))}
              </div>

              {/* Expand / Collapse toggle */}
              {filtered.length > PREVIEW_COUNT && (
                <div className="menu-toggle-wrapper">
                  {!menuExpanded && (
                    <div className="menu-fade-overlay"></div>
                  )}
                  <button
                    className="menu-toggle-btn"
                    onClick={toggleMenuExpand}
                  >
                    {menuExpanded ? (
                      <>
                        <MdExpandLess className="toggle-icon" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <MdExpandMore className="toggle-icon" />
                        View Full Menu ({filtered.length} items)
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Menu;
