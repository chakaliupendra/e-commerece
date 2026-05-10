import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const endpoint = searchQuery 
          ? `/products/search?name=${searchQuery}` 
          : '/products';
        const response = await api.get(endpoint);
        setProducts(response.data.content || response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="home-page container">
      <header className="hero">
        <h1 className="hero-title">Experience the Future of <span>Shopping</span></h1>
        <p className="hero-subtitle">Premium quality products curated just for you with the fastest delivery across the globe.</p>
      </header>

      <section className="product-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <div className="line"></div>
        </div>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
