import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {ToastContainer}  from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import Login from "./components/Login";

import LabTest from "./pages/LabTest";
import LabBook from "./components/LabBook";

import HomePage from "./pages/HomePage";
import MedicinePage from "./pages/MedicinePage";
import DoctorPage from "./pages/DoctorPage";
import HealthcarePage from "./pages/HealthcarePage";
import CartPage from "./pages/CartPage";
import ViewBooking from "./pages/ViewBooking";


import MedicineCat from "./components/MedicineCat";
import MedicineCard from "./components/MedicineCard";


import Women from "./pages/Women";
import WomenCat from "./components/WomenCat";
import WomenCard from "./components/WomenCard";


import Children from "./pages/Children";
import ChildrenCat from "./components/ChildrenCat";
import ChildrenCard from "./components/ChildrenCard";


// 🧔 Men Section
import MenPage from "./pages/MenPage";
import MenCategory from "./components/MenCategory";
import MenProductCard from "./components/MenProductCard";

// 👴 Elder Section
import ElderPage from "./pages/ElderPage";
import ElderCategory from "./components/ElderCategory";
import ElderProductCard from "./components/ElderProductCard";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const AuthContext = React.createContext();
  

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
    
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, setUser }}>
        <Header
          
  openLogin={() => {
    setShowLogin(true);
    document.body.classList.add("noscroll");
  }}
  user={user}
  logout={() => {
    localStorage.removeItem("user");
    setUser(null);
  }}

/>
          
        <CategoryNav />

        <div className={`page-content ${showLogin ? "blurred" : ""}`}>
          <Routes>
            {/* 🏠 Home */}
            <Route path="/" element={<HomePage />} />

            {/* 💊 Medicine */}
            <Route path="/medicine" element={<MedicinePage />} />
            <Route path="/medicine/category/:category" element={<MedicineCat />} />
            <Route path="/medicine/details/:id" element={<MedicineCard user={user} />} />

            {/* 👩 Women */}
            <Route path="/women" element={<Women />} />
            <Route path="/women/category/:category" element={<WomenCat />} />
            <Route path="/women/details/:id" element={<WomenCard user={user} />} />

            {/* 👶 Children */}
            <Route path="/child" element={<Children />} />
            <Route path="/child/category/:category" element={<ChildrenCat />} />
            <Route path="/child/details/:id" element={<ChildrenCard user={user} />} />

            {/* 🧔 Men */}
            <Route path="/men" element={<MenPage />} />
            <Route path="/men/category/:category" element={<MenCategory />} />
            <Route path="/men/details/:id" element={<MenProductCard user={user} />} />

            {/* 👴 Elder */}
            <Route path="/elder" element={<ElderPage />} />
            <Route path="/elder/category/:category" element={<ElderCategory />} />
            <Route path="/elder/details/:id" element={<ElderProductCard user={user} />} />

            {/* 👨‍⚕️ Others */}
            <Route path="/doctor-consult" element={<DoctorPage user={user} />} />
            <Route path="/healthcare" element={<HealthcarePage user={user} />} />

            <Route path="/lab-tests" element={<LabTest/>} />
            <Route path="/test" element={<LabBook user={user}/>} />

            <Route path="/offers" element={<div>Offers Page</div>} />
            <Route path="/cart" element={<CartPage user={user}/>} />
            <Route path="/view" element={<ViewBooking user={user}/>} />

            {/* 🔄 Redirects */}
            <Route path="/pages/Men" element={<Navigate to="/men" />} />
            <Route path="/pages/Elder" element={<Navigate to="/elder" />} />
          </Routes>
           <ToastContainer position="top-right" autoClose={2000} />
        </div>
      

      {/* Login Popup */}
      {showLogin && (
  <div className="login-overlay">
    <div className="login-wing">
      <button
        className="close-btn"
        onClick={() => {
          setShowLogin(false);
          document.body.classList.remove("noscroll");
        }}
      >
        X
      </button>
      <Login
        setUser={(userData) => {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }}
        closeLogin={() => {
          setShowLogin(false);
          document.body.classList.remove("noscroll");
        }}
      />
    </div>
  </div>
)}

      </AuthContext.Provider>
    </BrowserRouter>
    
  );
}

export default App;
