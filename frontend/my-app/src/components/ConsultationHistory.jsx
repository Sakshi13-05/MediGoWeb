import React from "react";
import "./ConsultationHistory.css";
import { pastConsultations } from "../data/pastConsultations";

function ConsultationHistory() {
  return (
    <div className="history-container">
      <h2>Your Past Consultations</h2>
      {pastConsultations.map((item, index) => (
        <div className="history-card" key={index}>
          <div className="history-header">
            <h3>{item.doctor} ({item.specialty})</h3>
            <span className="rating">⭐ {item.rating}</span>
          </div>
          <p><strong>Patient:</strong> {item.name}</p>
          <p><strong>Date:</strong> {item.date} at {item.time}</p>
          <p><strong>Feedback:</strong> {item.feedback}</p>
        </div>
      ))}
    </div>
  );
}

export default ConsultationHistory;
