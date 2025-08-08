// src/components/DoctorForm.jsx
import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import "./DoctorForm.css";

function DoctorForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "", // added email for sending confirmation
    symptoms: "",
    date: "",
    time: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Send data to MongoDB backend
      await axios.post("http://localhost:5000/consultation", formData);

      // 2️⃣ Send email via EmailJS
      await emailjs.send(
        "service_tt18i7c",              // Your EmailJS Service ID
        "template_grcd189",            // Your EmailJS Template ID
        {
          name: formData.name,
          email: formData.email,
          symptoms: formData.symptoms,
          date: formData.date,
          time: formData.time,
        },
        "7fZ8fKwGnPGmpRpFx"            // Your EmailJS Public Key
      );

      // 3️⃣ Animate and close
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <div className={`form-container ${submitted ? "form-submit-animate" : ""}`}>
      <h2>Book Your Consultation</h2>
      <form className="consult-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <label>Age</label>
        <input
          type="number"
          name="age"
          required
          value={formData.age}
          onChange={handleChange}
        />

        <label>Gender</label>
        <select
          name="gender"
          required
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email to receive confirmation"
        />

        <label>Symptoms</label>
        <textarea
          name="symptoms"
          rows="3"
          required
          value={formData.symptoms}
          onChange={handleChange}
        />

        <label>Preferred Date</label>
        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
        />

        <label>Preferred Time</label>
        <input
          type="time"
          name="time"
          required
          value={formData.time}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DoctorForm;
