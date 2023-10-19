import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import axios from 'axios';
import Login from "./Login";
import RegistrationForm from "./RegistrationForm";
import EmailVerification from "./EmailVerification"; // Import the EmailVerification component
import LoginForm from "./LoginForm";
import Home from "./Home";

import HomeDisplay from "./HomeDisplay";
import HomePageThree from "./HomePageThree";
import Main from "./Main"; // Import the Main component
import Jobs from "./Jobs"; 
import UserProfile from "./UserProfile";
import { ImageProvider } from "./ImageContext"; // Import the ImageProvider



function App() {
  return (
    <div className="App">
      {/* <ThemeSwitcher /> */}
      <Router>
      <ImageProvider> {/* Wrap your app with the ImageProvider */}
        <Routes>
        
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/verify/:token" component={<EmailVerification />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/main" element={<Main />} />
          <Route path="/home/*" element={<HeaderAndHome />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="/" element={<HomeComponents />} />
        </Routes>
        </ImageProvider>
      </Router>
    </div>
  );
}

// Define components for different sections
function HomeComponents() {
  return (
    <>
      <Login />
      <HomeDisplay />
      <HomePageThree />
    </>
  );
}

function HeaderAndHome() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
