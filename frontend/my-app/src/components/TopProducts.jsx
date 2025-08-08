import React from 'react';
import './TopProducts.css';

const products = [
  {
    name: 'Paracetamol 500mg',
    price: '₹25',
    image: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png', // medicine
  },
  {
    name: 'Multivitamin Capsules',
    price: '₹130',
    image: 'https://cdn-icons-png.flaticon.com/512/686/686589.png', // capsule
  },
  {
    name: 'Cough Syrup',
    price: '₹95',
    image: 'https://cdn-icons-png.flaticon.com/512/798/798231.png', // syrup
  },
  {
    name: 'Hand Sanitizer',
    price: '₹60',
    image: 'https://cdn-icons-png.flaticon.com/512/4825/4825071.png', // sanitizer
  },
];

function TopProducts() {
  return (
    <div className="top-products-section">
      <h2 className="section-title">Top Products</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <div className="product-img-container">
              <img src={product.image} alt={product.name} />
            </div>
            <h4>{product.name}</h4>
            <p>{product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopProducts;
