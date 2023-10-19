import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username:"",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Registration Successful! " + result.token);
        navigate("/login"); // Redirect to login page after successful registration
      } else {
        const errorData = await response.json();
        if (errorData.error === 'Email already exists') {
          alert('Email is already registered. Please use a different email.');
        } else {
          console.error('Registration failed');
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="registration-page-container">
      <div className="registration-form">
        <h2>Registration Form</h2>
        <form id="registrationForm" onSubmit={handleSubmit}>
          <img
            src="../images/login-hero.svg"
            alt="RegistrationImage"
            className="registration-image"
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
