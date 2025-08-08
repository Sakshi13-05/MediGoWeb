// src/pages/DoctorPage.jsx
import React, { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import SpecialtySelector from "../components/SpecialtySelector";
import DoctorCard from "../components/DoctorCard";
import DoctorForm from "../components/DoctorForm";
import { doctors } from "../data/doctors";
import "../components/DoctorCard.css";
import ConsultationHistory from "../components/ConsultationHistory";

function DoctorPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [showForm, setShowForm] = useState(false);

  // Filter doctors based on selected specialty
  const filteredDoctors =
    selectedSpecialty === "All"
      ? doctors
      : doctors.filter((doc) => doc.specialty === selectedSpecialty);

  return (
    <div>
      {/* Hero banner */}
      <HeroBanner />

      {/* Specialty pills */}
      <SpecialtySelector
        selected={selectedSpecialty}
        onSelect={setSelectedSpecialty}
      />

      {/* Doctor Cards */}
      <div className="doctor-card-container">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc, i) => (
            <DoctorCard
              key={i}
              doctor={doc}
              onConsultClick={() => setShowForm(true)}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>
            No doctors found in this specialty.
          </p>
        )}
      </div>

      {/* Form appears on Consult button click */}
      {showForm && <DoctorForm onClose={() => setShowForm(false)} />}

      {/* 👇 Past consultations always visible */}
      <ConsultationHistory />
    </div>
  );
}

export default DoctorPage;
