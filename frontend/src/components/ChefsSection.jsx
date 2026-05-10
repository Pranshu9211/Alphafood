import './ChefsSection.css';
import Marcus from '../assets/Marcus Vance.jpg';
import Gordon from '../assets/Gordon.jpg';
import Jamie from '../assets/Jamie Oliver.jpg';

const ChefsSection = () => {
  const chefs = [
    {
      id: 1,
      name: 'Marcus Vance',
      title: 'Executive Chef',
      specialty: 'Artisan & Grill Cooking',
      description: 'With over 20 years of culinary excellence and Michelin star experience, Marcus brings refined techniques to every dish.',
      image: Marcus,
      social: {
        instagram: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      id: 2,
      name: 'Gordon Ramsay',
      title: 'Sous Chef',
      specialty: 'French Cuisine Specialist',
      description: 'Trained in Paris with a passion for classical French techniques. Elena\'s menus showcase elegant simplicity and depth.',
      image: Gordon,
      social: {
        instagram: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      id: 3,
      name: 'Jamie Oliver',
      title: 'Pastry Chef',
      specialty: 'Modern Patisserie & Desserts',
      description: 'Creating contemporary desserts that balance indulgence with artistry. Julian\'s creations are truly Instagram-worthy.',
      image: Jamie,
      social: {
        instagram: '#',
        twitter: '#',
        linkedin: '#'
      }
    }
  ];

  return (
    <section className="chefs-section">
      <div className="chefs-container">
        <div className="chefs-header">
          <h2 className="chefs-title">Masters of the Kitchen</h2>
          <p className="chefs-subtitle">
            Meet the culinary artisans behind every exceptional dish
          </p>
        </div>

        <div className="chefs-grid">
          {chefs.map((chef) => (
            <div key={chef.id} className="chef-card">
              <div className="chef-image-wrapper">
                <img 
                  src={chef.image} 
                  alt={chef.name}
                  className="chef-image"
                />
                <div className="chef-overlay">
                  <div className="chef-socials">
                    <a href={chef.social.instagram} className="social-icon">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href={chef.social.twitter} className="social-icon">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href={chef.social.linkedin} className="social-icon">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="chef-info">
                <h3 className="chef-name">{chef.name}</h3>
                <p className="chef-title">{chef.title}</p>
                <p className="chef-specialty">{chef.specialty}</p>
                <p className="chef-description">{chef.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefsSection;
