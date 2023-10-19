import React, { useState, useEffect } from "react";
import "./Feed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Post from "./Post"; // Import the Post component from post.js
import jwtDecode from "jwt-decode";

function Feed({fetchPostsFromLocalStorage}) {
  const [showButtons, setShowButtons] = useState(false); // State to control button visibility
  const [firstName, setFirstName] = useState(""); // State to hold the firstName
  const [message, setMessage] = useState(""); // State to store the entered message
  const [posts, setPosts] = useState([]); // State to store posted messages

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Decode the JWT token
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken); // Check the console for the decoded token

      // Extract the first name from the decoded token
      const userFirstName = decodedToken.firstName;

      // Set the first name in the component state
      setFirstName(userFirstName);
    }
  }, []);

  const handleInputChange = (e) => {
    setMessage(e.target.value); // Update the message state when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() !== "") {
      const requestUrl = "http://localhost:5000/postRoutes/posts"; // Replace with your actual URL
      console.log("Sending POST request to:", requestUrl);

      console.log("User First Name:", firstName);
      // Create a new post object with user details and message
      const newPost = {
        // userEmail: userEmail, // Use the user's email
        name: firstName, // Replace with actual user name
        message: message,
        photourl:
          "https://icon-library.com/images/user-icon-jpg/user-icon-jpg-28.jpg", // Replace with actual user photo
      };
      console.log("New Post Object:", newPost); 

      // Add the new post to the posts array
      const updatedPosts = [...posts, newPost];

      // Clear the message input
      setMessage("");

      // Show the buttons after sending a message
      setShowButtons(true);

      try {
        const response = await fetch(requestUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        });

        const responseData = await response.json();
        console.log("Response:", responseData); // Debugging line
        fetchPostsFromLocalStorage()
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  return (
    <div className="feed">
      <div className="feed_inputContainer">
        <div className="feed_input">
          <FontAwesomeIcon icon={faPlus} />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={handleInputChange}
              placeholder="Write a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      {showButtons && (
        // Display the posted messages and buttons
        <div>
          {posts.map((post, index) => (
            <Post
              key={index}
              name={post.name}
              message={post.message}
              photourl={post.photourl}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Feed;
