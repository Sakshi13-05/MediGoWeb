// src/pages/articles/HealthyLifeArticle.jsx
import React from "react";
import "../../components/ArticleDetail.css";

function HealthyLifeArticle() {
  return (
    <div className="article-detail">
      <h2>5 Tips for a Healthier Life</h2>
      <img
        src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80"
        alt="Healthy Living"
      />
      <p>
        Living a healthy life doesn’t have to be complicated. Here are five simple, science-backed
        habits that can drastically improve your overall well-being:
      </p>
      <ul>
        <li>🌿 Start your day with a walk or light movement</li>
        <li>🥗 Eat fresh, whole foods as much as possible</li>
        <li>💧 Stay hydrated and avoid sugary drinks</li>
        <li>🧘‍♀️ Practice mindfulness or meditation for 10 mins</li>
        <li>🛌 Prioritize good sleep</li>
      </ul>
      <p>Consistency is key. These daily practices compound over time!</p>
    </div>
  );
}

export default HealthyLifeArticle;
