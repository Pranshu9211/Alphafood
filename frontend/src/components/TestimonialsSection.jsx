import './TestimonialsSection.css';
import Foodie1 from '../assets/foodie1.jpg';
import Foodie2 from '../assets/foodie2.jpg';
import Foodie3 from '../assets/foodie3.jpg';
const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah M.',
      role: 'Food Bloggers',
      image: Foodie1,
      text: 'The Signature Truffle Lobster was an absolutely exquisite meal. The depth of flavor from the black truffle and the precision of the temperature-controlled delivery really amazed me. AlphaFoods has elevated online food delivery to an art form.',
      rating: 5
    },
    {
      id: 2,
      name: 'James T.',
      role: 'Customers',
      image: Foodie2,
      text: 'Consistently wonderful. The ingredients are fresh, the plating is impeccable, and the delivery is always on time. Ordering from AlphaFoods has become my favorite way to enjoy restaurant-quality meals at home.',
      rating: 5
    },
    {
      id: 3,
      name: 'Maria C.',
      role: 'Influencers',
      image: Foodie3,
      text: 'Tremendously impressed with the attention to detail. This delivery service handles premium ingredients with the care they deserve. Their commitment to packaging and presentation mirrors my own restaurant standards.',
      rating: 5
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Loved by Foodies</h2>
          <p className="testimonials-subtitle">
            Don't just take our word for it. Here's what our community loves about AlphaFoods.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
