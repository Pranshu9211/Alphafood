import './GallerySection.css';
import Pasta from '../assets/pasta.avif';
import Pizza from '../assets/Pepperoni Pizza.avif';
import Burger from '../assets/Burger Supreme.avif';
import Plated from '../assets/Gourmet Plated Dish.avif';


const GallerySection = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Gourmet Pasta',
      image: Pasta,
      category: 'Italian'
    },
    {
      id: 2,
      title: 'Pepperoni Pizza',
      image: Pizza,
      category: 'Italian'
    },
    {
      id: 3,
      title: 'Burger Supreme',
      image: Burger,
      category: 'American'
    },
    {
      id: 4,
      title: 'Gourmet Plated Dish',
      image: Plated,
      category: 'Fine Dining'
    },
    
  ];

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="gallery-title">A Feast for the Eyes</h2>
          <p className="gallery-subtitle">
            Explore our culinary creations, where every dish is a masterpiece designed to delight your senses
          </p>
        </div>
        
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-item">
              <div className="gallery-image-wrapper">
                <img src={item.image} alt={item.title} className="gallery-image" />
                <div className="gallery-overlay">
                  <div className="gallery-info">
                    <h3>{item.title}</h3>
                    <p>{item.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
