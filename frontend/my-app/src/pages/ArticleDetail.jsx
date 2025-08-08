// src/pages/HealthcarePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/HealthcarePage.css";

const articles = [
  {
    id: "healthy-lifestyle",
    title: "5 Tips for a Healthier Life",
    image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80",
    desc: "Daily habits to improve your well-being and energy.",
  },
  {
    id: "checkups-importance",
    title: "Why Regular Health Checkups Matter",
    image: "https://images.unsplash.com/photo-1576765608866-5b51046452be?q=80",
    desc: "Preventive care is the best care. Learn why.",
  },
  {
    id: "balanced-nutrition",
    title: "Your Guide to Balanced Nutrition",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    desc: "Healthy eating tips that don’t feel like a diet.",
  },
  {
    id: "mental-health",
    title: "Mental Health Awareness & Self-Care",
    image: "https://plus.unsplash.com/premium_photo-1683133518677-6125a05cda5b?q=80",
    desc: "Simple steps to manage stress and boost your mood.",
  },
];

function HealthcarePage() {
  const navigate = useNavigate();

  return (
    <div className="healthcare-container">
      <header className="healthcare-header">
        <h1>Discover Better Living</h1>
        <p>Your curated guide to wellness, health, and expert advice.</p>
      </header>

      <section className="article-grid">
        {articles.map((article) => (
          <div className="article-card" key={article.id}>
            <img src={article.image} alt={article.title} className="article-image" />
            <div className="article-text">
              <h3>{article.title}</h3>
              <p>{article.desc}</p>
              <button
                className="read-more"
                onClick={() => navigate(`/healthcare/${article.id}`)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default HealthcarePage;
