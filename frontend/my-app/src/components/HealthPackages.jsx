import React from "react";
import "./HealthPackages.css";

const healthPackages = [
  {
    id: "pkg1",
    title: "Full Body Checkup",
    description: "70+ tests including CBC, Thyroid, Liver, Kidney & more",
    price: 899,
    originalPrice: 1799,
    image: "/images/full-body-test.png",
    fasting: "Fasting Required",
    reportTime: "24 hrs"
  },
  {
    id: "pkg2",
    title: "Diabetes Package",
    description: "Includes HbA1c, Glucose, Lipid profile & Kidney tests",
    price: 499,
    originalPrice: 999,
    image: "/images/diabetes-check.png",
    fasting: "Fasting Required",
    reportTime: "12 hrs"
  },
  {
    id: "pkg3",
    title: "Heart Health Package",
    description: "Lipid Profile, ECG, BP Check, CRP & more",
    price: 799,
    originalPrice: 1499,
    image: "/images/heart-check.png",
    fasting: "Not Required",
    reportTime: "24 hrs"
  }
];

function HealthPackages() {
  return (
    <div className="health-packages-section">
      <h2>Popular Health Packages</h2>
      <div className="health-packages-grid">
        {healthPackages.map((pkg) => (
          <div className="health-package-card" key={pkg.id}>
            <img src={pkg.image} alt={pkg.title} />
            <h3>{pkg.title}</h3>
            <p>{pkg.description}</p>
            <div className="package-pricing">
              <span className="price">₹{pkg.price}</span>
              <span className="original-price">₹{pkg.originalPrice}</span>
            </div>
            <button
              className="book-btn"
              onClick={() => alert("Package Booked!")}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthPackages;
