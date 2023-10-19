import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Retrieve existing user data from localStorage or create an empty array
        const existingUserNames =
          JSON.parse(localStorage.getItem("firstName")) || [];
        // Check if the name is already in the array before adding it
      if (!existingUserNames.includes(result.firstName)) {
        // Add the new user's first name to the array
        const newUserFirstName = result.firstName;
        existingUserNames.push(newUserFirstName);

        // Store the updated array back in localStorage
        localStorage.setItem("firstName", JSON.stringify(existingUserNames));
      }

        // Store the updated array back in localStorage
        localStorage.setItem("firstName", JSON.stringify(existingUserNames));
        localStorage.setItem("token", result.token);
        alert("Login Successful! " + result.token);
        console.log("Stored firstName:", result.firstName);
        navigate("/home"); // Redirect to home page after successful login
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form">
        <h2>Login Form</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <img
            src="../images/login-hero.svg"
            alt="RegistrationImage"
            className="login-image"
          />
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

          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
