import React, { useState, useRef } from "react";
import "./Login.css"; 
import { IoPerson } from "react-icons/io5";
import { FaMailBulk } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { useNavigate } from "react-router-dom";  

function Login({ setUser, closeLogin }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "user"
  });

  const mailref = useRef();
  const nameref = useRef();
  const navigate = useNavigate();  // ✅ Initialize navigator

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.name.trim() === "") {
      alert("Please fill Name");
      nameref.current.focus();
      return;
    }

    if (form.email.trim() === "") {
      alert("Please fill Email");
      mailref.current.focus();
      return;
    }

    

    try {
      // ✅ Send email
      await emailjs.send(
        "service_tt18i7c",
        "template_r0edwhm",
        {
          name: form.name,
          email: form.email,
          type: form.type
        },
        "7fZ8fKwGnPGmpRpFx"
      );

      // ✅ Send to backend
      const res=await axios.post("http://localhost:5000/login", form);
      const userObj={
      name: form.name,
      email: form.email,
      type: form.type,
      userId:res.data.userId
    };
     setUser(userObj);

     localStorage.setItem("user",JSON.stringify(userObj));

      // ✅ After success:
      setForm({ name: "", email: "", type: "user" });
      closeLogin();               // Close modal
      navigate("/");              // Redirect to landing/home
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong. Please try again.");
    }
    

  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label><span><IoPerson /></span> Name:</label>
      <input 
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter your name"
        ref={nameref}
      />

      <label><span><FaMailBulk /></span> Email:</label>
      <input 
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter your email"
        ref={mailref}
      />

      <label><span><MdMedicalServices /></span> Register As:</label>
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
      >
        <option value="user">User</option>
        <option value="store">Medical Store</option>
      </select>

      <button type="submit">Send Mail</button>
    </form>
  );
}

export default Login;
