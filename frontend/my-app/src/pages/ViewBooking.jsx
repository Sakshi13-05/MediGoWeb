import React from "react";
import "./ViewBooking.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

function ViewBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state || {};

  if (!bookingDetails) {
    return <h2 className="empty-message">Your cart is empty</h2>;
  }

  return (
    <div className="view-booking-container">
      <div className="booking-card">
        <h2 className="booking-title">
          <FaCartPlus style={{ marginRight: "10px" }} />
          Booking Details
        </h2>

        <div className="booking-details">
          <p>
            <strong>Test Name:</strong>
            <span className="booking-value">{bookingDetails.name}</span>
          </p>
          <p>
            <strong>Price:</strong>
            <span className="booking-value">₹{bookingDetails.price}</span>
          </p>
          <p>
            <strong>Fasting:</strong>
            <span className="booking-value">{bookingDetails.fasting}</span>
          </p>
          <p>
            <strong>Report Time:</strong>
            <span className="booking-value">{bookingDetails.reportTime}</span>
          </p>
          {bookingDetails.includes && (
            <p>
              <strong>Includes:</strong>
              <span className="booking-value">{bookingDetails.includes}</span>
            </p>
          )}
        </div>

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default ViewBooking;
