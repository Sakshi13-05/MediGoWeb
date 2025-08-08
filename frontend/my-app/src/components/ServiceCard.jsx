import React from "react";

function ServiceCard({ title, desc, img }) {
  const cardStyle = {
    width: "280px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.3s ease",
  };

  const imgStyle = {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    marginBottom: "15px",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "10px",
  };

  const descStyle = {
    fontSize: "14px",
    color: "#555",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img src={img} alt={title} style={imgStyle} />
      <div style={titleStyle}>{title}</div>
      <div style={descStyle}>{desc}</div>
    </div>
  );
}

export default ServiceCard;
