import React, { useState } from "react";
import "./LabBook.css";
import { useNavigate } from "react-router-dom";
import { FaCommentMedical } from "react-icons/fa";
import LabTests from "../data/LabTest.json";
import LabSearch from "./LabSearch";
import axios from "axios";

function LabBook({ user }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(null);
  

  const filteredTests = LabTests.filter((test) =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBooking = (test) => {
    setCart(test);

    axios
      .post("http://localhost:5000/lab", {
        userId: user.userId,
        testId: test.id,
        testName: test.name,
        price: test.price,
        fasting: test.fasting,
        reportTime: test.reportTime,
        includes: test.includes || ""
      })
      .then((res) => {
        alert("Test added to cart!");
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Booking failed. Please try again.");
      });
  };

  return (
    <>
      <LabSearch setSearchTerm={setSearchTerm} suggestions={LabTests} />
      <div className="lab-booking-container">
        <div className="tests-section">
          <h2><FaCommentMedical /> Book Your Lab And Blood Tests Online</h2>
          {filteredTests.length > 0 ? (
            filteredTests.map((test) => (
              <div
                key={test.id}
                className={`test-card ${
                  cart && cart.id === test.id ? "selected" : ""
                }`}
              >
                <div className="test-details">
                  <h3>{test.name}</h3>
                  {test.includes && <p className="includes">{test.includes}</p>}
                  <div className="price-section">
                    <span className="price">₹{test.price}</span>
                    <span className="mrp">₹{test.mrp}</span>
                    <span className="discount">{test.discount}</span>
                  </div>
                  <div className="info-section">
                    <span>🧪 {test.fasting}</span>
                    <span>📄 {test.reportTime}</span>
                  </div>
                </div>
                <button className="book-btn" onClick={() => handleBooking(test)}>
                  {cart && cart.id === test.id ? "Booked" : "Book"}
                </button>
              </div>
            ))
          ) : (
            <p>No tests found</p>
          )}
        </div>

        <div className="cart-section">
          {cart ? (
            <>
              <h3>Test Added to Cart</h3>
              <p><strong>{cart.name}</strong></p>
              <p>Price: ₹{cart.price}</p>
              <p>{cart.fasting}</p>
              <p>{cart.reportTime}</p>
              {cart.includes && <p>{cart.includes}</p>}
              <button 
                onClick={() => {
    navigate("/view", { state: { bookingDetails: cart } });
  }} 
               
              className="view-cart-btn"
          >View Cart</button>
            </>
          ) : (
            <>
              <h3>Please select a test to proceed</h3>
              <button className="view-cart-btn disabled">View Cart</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default LabBook;
