import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";
import { useTheme } from "./ThemeContext"; // Import the useTheme hook
import jwtDecode from "jwt-decode";
import { useImageContext } from "./ImageContext";
import { Link } from "react-router-dom";
import ConnectionUsernames from "./ConnectionUsernames";

const Home = (props) => {
  const navigate = useNavigate();
  const { setSelectedImage } = useImageContext(); // Access setSelectedImage from the context

  const handleSignOut = () => {
    // // Perform sign-out logic here, e.g., clearing tokens, state, etc.
    // clearSession();
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/");
  };

  const [firstName, setFirstName] = useState(""); // State to hold the firstName
  const [userConnections, setUserConnections] = useState([]); // Initialize userConnections as an empty array
  const [connectionUsernames, setConnectionUsernames] = useState([]); // State to hold connection usernames
  const [showUsernames, setShowUsernames] = useState(false);
  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Decode the JWT token
      const decodedToken = jwtDecode(token);

      // Extract the first name and connections from the decoded token
      const userFirstName = decodedToken.firstName;
      const connections = decodedToken.connections.connections;
      console.log(connections);

      // Extract the user IDs from the connections object
      const connectionUserIds = connections.map((connection) => connection);

      // Set the first name and user connections in the component state
      setFirstName(userFirstName);
      setUserConnections(connectionUserIds);
    }
  }, []);

  const handleMyNetworkClick = async () => {
    if (!Array.isArray(userConnections)) {
      console.error("User connections are not an array");
      return;
    }

    const connectionUsernames = [];

    // Iterate over the userConnections array and fetch usernames for each user ID
    for (const userId of userConnections) {
      try {
        // Make an API request to fetch the username for the given userId
        const response = await fetch(`http://localhost:5000/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          const username = data.username;
          connectionUsernames.push(username);
        } else {
          console.error(`Failed to fetch username for user with ID: ${userId}`);
        }
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    }

    // Set the extracted usernames to your state or a variable to display them in your component
    setConnectionUsernames(connectionUsernames);
    setShowUsernames(true);
    console.log("User's Connection Usernames:", connectionUsernames);
  };

  const handleBackClick = () => {
    setShowUsernames(false);
  };

  const { theme, toggleTheme } = useTheme();
  const themeColors = {
    dark: {
      backgroundColor: "#002b36",
    },
    light: {
      backgroundColor: "#f5f5f5",
    },
  };
  const currentThemeColors = themeColors[theme];
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleThemeChange = (selectedTheme) => {
    toggleTheme(selectedTheme);
    setShowDropdown(false);
  };

  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [users, setUsers] = useState([]); // State to hold the user data
  const [selectedUser, setSelectedUser] = useState(null); // State to hold the selected user
  // const [makesearchreq,setmakesearchreq] = useState();

  // Load user data from localStorage when the component mounts
  let timer;
  function debounce(fn, delay) {
    if (timer) {
      clearTimeout(timer);
      return;
    }
    timer = setTimeout(fn, delay);
  }

  const handleSearch = async (event) => {
    const query = event.target.value.toLowerCase(); // Convert query to lowercase

    setSearchQuery(query);
    debounce(async () => {
      try {
        let data = await fetch("http://localhost:5000/search", {
          method: "POST",
          body: JSON.stringify({
            query: query,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });

        let res = await data.json();
        if (res.success) {
          setUsers(res.user);
        } else {
        }
        console.log(res);
      } catch (error) {}
    }, 500);
  };

  useEffect(() => {
    const storedUserJSON = localStorage.getItem("selectedUser");

    if (storedUserJSON) {
      // Parse the stored JSON data to get the user object
      const storedUser = JSON.parse(storedUserJSON);

      // Set the selected user in state
      setSelectedUser(storedUser);
    }
  }, []);

  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Function to handle the "Apply" button click and show the form
  const handleApplyClick = () => {
    setShowForm(true);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to the server.
    // After successful submission, you can show a thank you message.
    // Reset the form and hide it.
    // Example: sendFormData(formData);
    setShowForm(false);
  };

  return (
    <Container style={{ backgroundColor: currentThemeColors.backgroundColor }}>
      <header>
        <Content>
          <Logo>
            <a href="/home">
              <img src="/images/home-logo.svg" alt="" />
            </a>
          </Logo>
          <Search>
            <div>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <SearchIcon>
              <img src="/images/search-icon.svg" alt="" />
            </SearchIcon>
            {/* Matched Users Dropdown */}
            {users?.length > 0 && (
              <DropdownContainer>
                <MatchedUsersDropdown>
                  {users?.map((item, index) => (
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/profile/${item?.username}`}
                    >
                      <MatchedUserItem key={index}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            style={{ height: 30, width: 30 }}
                            src={
                              item?.image ||
                              `https://images.unsplash.com/photo-1533293228485-8beba61d4cf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuJTIwYW5kJTIwd29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60`
                            }
                            alt=""
                          />
                          <h1
                            style={{
                              fontSize: "16px",
                              paddingLeft: "10px",
                              textDecoration: "none",
                            }}
                          >
                            {item?.username}
                          </h1>
                        </div>
                      </MatchedUserItem>
                    </Link>
                  ))}
                </MatchedUsersDropdown>
              </DropdownContainer>
            )}
          </Search>

          <Nav>
            <NavListWrap>
              <NavList className="active">
                <a href="/home">
                  <img src="/images/nav-home.svg" alt="" />
                  <span>Home</span>
                </a>
              </NavList>

              <NavList>
                <a onClick={handleMyNetworkClick}>
                  <img src="/images/nav-network.svg" alt="" />
                  <span>My Network</span>
                </a>
              </NavList>

              {/* Display connection usernames */}
              {/* <div>
                {connectionUsernames &&
                  connectionUsernames.map((username) => (
                    <p key={username}>{username}</p>
                  ))}
              </div> */}
              {showUsernames && (
                <ConnectionUsernames usernames={connectionUsernames} onBackClick={handleBackClick} />
              )}

              <NavList>
                <Link to="/jobs">
                  <img src="/images/nav-jobs.svg" alt="" />
                  <span>Jobs</span>
                </Link>
              </NavList>
              {jobs.length > 0 && (
                <div>
                  <h2>Job Listings:</h2>
                  <ul>
                    {jobs.map((job, index) => (
                      <li key={index}>
                        {job.name}{" "}
                        <button onClick={handleApplyClick}>Apply</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {showForm && (
                <div>
                  <h2>Apply for a Job</h2>
                  <form onSubmit={handleSubmit}>
                    {/* Add your form fields here */}
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <textarea placeholder="Cover Letter"></textarea>
                    <button type="submit">Submit</button>
                  </form>
                </div>
              )}

              <User>
                <a href="/home">
                  <ImgProfile src="/images/user.svg" alt="" />
                  <span>{firstName}</span>
                  <ImgDrop src="/images/down-icon.svg" alt="" />
                </a>
                <SignOut>
                  <a onClick={handleSignOut}> Sign Out</a>
                </SignOut>
              </User>

              <Work>
                <a href="/home">
                  <ImgOption src="/images/nav-work.svg" alt="" />
                  <span>
                    Work
                    <img src="/images/down-icon.svg" alt="" />
                  </span>
                </a>
              </Work>
            </NavListWrap>
          </Nav>
          {/* Toggle Button */}
          <ToggleContainer>
            <ToggleButton onClick={handleToggleDropdown}>
              {/* Theme */}
              <ArrowIcon
                src="/images/down-icon.svg"
                alt="Toggle Arrow"
                isOpen={showDropdown}
              />
            </ToggleButton>
            {showDropdown && (
              <Dropdown>
                <DropdownOption onClick={() => handleThemeChange("dark")}>
                  Dark Theme
                </DropdownOption>
                <DropdownOption onClick={() => handleThemeChange("light")}>
                  Light Theme
                </DropdownOption>
              </Dropdown>
            )}
          </ToggleContainer>
        </Content>
      </header>
      <Layout>
        <Leftside />
        <Main />
        <Rightside />
      </Layout>
    </Container>
  );
};

const DropdownContainer = styled.div`
  position: relative;
`;

const MatchedUsersDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const MatchedUserItem = styled.div`
  /* Your matched user item styles */
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  padding-top: 30px;
  max-width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
  @media (max-width: 768px) {
  }
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 245px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
  @media (max-width: 768px) {
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 999px;
    input {
      width: 245px;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    margin-right: 40px;
    margin: 0;
    align-items: center;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      img {
        position: relative;
        top: 3px;
      }
      span {
        visibility: hidden;
      }
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
  cursor: pointer;
`;

const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
    padding-top: 5px;
    font-weight: bolder;
  }
  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;

const ImgProfile = styled.img`
  position: relative;
  top: 5px;
`;

const ImgDrop = styled.img`
  position: relative;
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  @media (max-width: 768px) {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
  }
`;

const ImgOption = styled.img`
  @media (max-width: 768px) {
    visibility: hidden;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  position: relative;
`;

const ToggleButton = styled.button`
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%; /* Apply border-radius to make it circular */
  background-color: ${({ theme }) =>
    theme.backgroundColor}; /* Match button color with theme background */
  width: 40px; /* Set a fixed width and height to make it circular */
  height: 40px;
  transition: background-color 0.3s ease; /* Add a smooth transition effect */
  &:focus {
    outline: none; /* Remove default focus outline */
  }
`;

const ArrowIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 6px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const DropdownOption = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Home;
