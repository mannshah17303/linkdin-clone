import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const LogoImage = styled.img`
  /* Add your CSS styles for the logo image here */
  width: 200px; /* Example width */
  height: auto; /* Example height */
  position: relative; /* Enable relative positioning */
  top: -30px;
  left: -150px;
  /* Add any other styles you need */
`;



const TypingAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const TypingSpan = styled.span`
  border-right: 0.15em solid lightblue;
  // animation: ${TypingAnimation}  steps(40, end) infinite;
`;

const LogoText = styled.div`
  display: flex;
  margin-top: 50px;
  margin-right: 500px; /* Adjust the margin as needed */
  font-size: 30px; /* Adjust the font size as needed */
  font-weight: italic;
  color: #2977c9; /* Adjust the text color as needed */
`;

const Login = (props) => {
  const { theme } = useTheme();
  const themeColors = {
    light: {
      backgroundColor: "#f5f5f5",
      textColor: "#333",
      buttonBackground: "#007bff",
    },
    dark: {
      backgroundColor: "#333",
      textColor: "#fff",
      buttonBackground: "#ff9900",
    },
  };

  const [typingText, setTypingText] = useState("");

  useEffect(() => {
    const targetText = "Get Your Dream Job!";
    let currentText = "";
    let currentIndex = 0;
    let interval;

    const typeText = () => {
      if (currentIndex <= targetText.length) {
        currentText = targetText.slice(0, currentIndex);
        setTypingText(currentText);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    };

    interval = setInterval(typeText, 100);

    return () => clearInterval(interval);
  }, []);

  const currentThemeColors = themeColors[theme];

  return (
    <Container style={{ backgroundColor: currentThemeColors.backgroundColor }}>
      <Nav>
        <a href="/">
          <LogoImage src="/images/logo.png" alt="" />
        </a>
        <LogoText>
          {typingText}
          <TypingSpan />
        </LogoText>
        <div>
          <Join to="/register">Join now</Join>
          <SignIn to="/login">Sign in</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
        </Hero>
        <Form>
          <Google>
            <img src="/images/google.svg" alt="" />
            Sign in with Google
          </Google>
        </Form>
        <Hero>
          <img src="/images/login-hero.svg" alt="" />
        </Hero>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 0px;
  margin: 0;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      position: relative;
      padding: 0 5px;
      margin: 15px;
      width: 30%;
      top: 5px;
    }
  }
`;

const Join = styled(Link)`
  position: relative;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  right: 10px;
  text-decoration: none;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  @media (max-width: 768px) {
    position: relative;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 700;
    right: 10px;
    top: 0px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
`;

const SignIn = styled(Link)`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  @media (max-width: 768px) {
    position: relative;
    padding: 6px 9px;
    right: 15px;
    top: 0px;
  }
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 100px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    padding: 0;
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 30px;
      width: 100%;
      line-height: 2;
      color: brown;
    }
  }
  img {
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    @media (max-width: 768px) {
      top: 260px;
      margin-top: 10%;
      margin-left: 15px;
      width: 90%;
      position: initial;
      height: initial;
      margin-bottom: 0;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  border: 1px solid #000000;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  @media (max-width: 768px) {
    margin-left: 15px;
    width: 90%;
  }
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;
export default Login;
