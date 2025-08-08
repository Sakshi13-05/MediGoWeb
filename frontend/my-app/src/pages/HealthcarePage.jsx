// src/pages/HealthcarePage.jsx
import React from "react";
import "../components/HealthcarePage.css";
import { useNavigate } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "5 Tips for a Healthier Life",
    image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80",
    desc: "Daily habits to improve your well-being and energy.",
    content: "Here are 5 key things you can do daily to stay healthy: 1. Stay hydrated. 2. Walk 30 mins. 3. Avoid junk. 4. Sleep well. 5. Meditate or relax your mind. Small changes lead to big results."
  },
  {
    id: 2,
    title: "Why Regular Health Checkups Matter",
    image: "https://images.unsplash.com/photo-1576765608866-5b51046452be?q=80",
    desc: "Preventive care is the best care. Learn why.",
    content: "Regular checkups help detect problems early. Screening for BP, diabetes, heart disease, etc., reduces risk. Prevention is always better than cure."
  },
  {
    id: 3,
    title: "Your Guide to Balanced Nutrition",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    desc: "Healthy eating tips that don’t feel like a diet.",
    content: "Nutrition is key to energy and immunity. Focus on variety, colorful plates, and mindful eating. Cut back processed foods and prioritize natural ingredients."
  },
  {
    id: 4,
    title: "Mental Health Awareness & Self-Care",
    image: "https://plus.unsplash.com/premium_photo-1683133518677-6125a05cda5b?q=80",
    desc: "Simple steps to manage stress and boost your mood.",
    content: "Mental health is as important as physical. Journaling, meditation, and regular breaks can help reset your mind. Don't hesitate to seek professional help if needed."
  },
  {
    id: 5,
    title: "Immunity Boosters You Need Now",
    image: "https://plus.unsplash.com/premium_photo-1670981098417-dac28d081825?q=80",
    desc: "Strengthen your body’s defenses naturally.",
    content: "Immunity isn’t built in a day. Vitamin C, zinc, probiotics, restful sleep, and hydration all contribute. Avoid stress and maintain gut health."
  }
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
                onClick={() => navigate(`/article/${article.id}`, { state: article })}
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default HealthcarePage;
