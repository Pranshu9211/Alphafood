import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';
import GallerySection from '../components/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import ChefsSection from '../components/ChefsSection';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedSection />
      <GallerySection />
      <TestimonialsSection />
      <ChefsSection />
    </div>
  );
};

export default Home;
