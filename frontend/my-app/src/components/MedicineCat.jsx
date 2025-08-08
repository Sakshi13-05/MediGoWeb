import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import Medicines from "../data/Medicines.json"; // Assuming you have a JSON file with medicine data
import "./MedicineCat.css"
import { GiPriceTag } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";

function MedicineCat(){
  const {category}=useParams();
   
  // give access to url parameters
  const navigate = useNavigate(); // Initialize the navigator

  const filterMedicine=Medicines.filter(
    (med)=>med.category===category
  );
 
  return(
      <div className="medicine-page">
      <h2>Medicines for {category}</h2>

      {filterMedicine.length === 0 ? (
        <p>No medicines found for this category.</p>
      ) : (
        <div className="medicine-list">
          {filterMedicine.map((med, idx) => (
            <div
            key={idx} 
            className="medicine-card"
            onClick={() => navigate(`/medicine/details/${med.id}`)} // Navigate to the medicine detail page
            style={{ cursor: "pointer" }}
            >
              <img src={med.image} alt={med.name} />
              <h4>{med.name}</h4>
              <p>Chemical Name: {med.chemicalName}</p>
              <p>{med.details}</p>
              <p>
                <b><span><GiPriceTag /></span>Price:</b> ₹{med.price} &nbsp;
                <span className="mrp">MRP: ₹{med.mrp}</span>
              </p>
              <p className="discount"><span><RiDiscountPercentFill /></span>{med.discount}</p>
            </div>
          ))}
        </div>
      )}
    </div>

  );
}
export default MedicineCat;
