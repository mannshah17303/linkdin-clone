import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link from React Router

const ConnectionUsernames = ({ usernames, onBackClick }) => {
  return (
    <Overlay>
      <UsernamesContainer>
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {usernames.map((username) => (
          <Link to={`/profile/${username}`} key={username}>
          <Username>{username}</Username>
        </Link>
        ))}
      </UsernamesContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; /* Ensure it's on top of other content */
`;

const UsernamesContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Username = styled.p`
  margin: 8px 0;
  font-size: 18px;
  font-weight: bold;
`;

export default ConnectionUsernames;
