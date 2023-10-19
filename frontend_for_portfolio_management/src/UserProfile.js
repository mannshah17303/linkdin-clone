import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import { useParams } from "react-router-dom";
// import { useImageContext } from "./ImageContext";
import jwtDecode from "jwt-decode";

const UserProfile = () => {
  // const [selectedImages, setSelectedImage] = useState(null);
  // const [selectedImageFile, setSelectedImageFile] = useState(null);
  const { username } = useParams(); // Get the user ID from the URL
  // const { selectedImage } = useImageContext(); // Access the selected image from the context
  // const [mounted,setmounted]= useState(false)
  const [userProfile, setUserProfile] = useState();
  // const [connection,setConnection] = useState(null);

  useEffect(() => {
    // Retrieve the connections count from local storage
    const storedConnections = JSON.parse(localStorage.getItem("connections"));
    if (storedConnections) {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        connections: {
          ...prevProfile?.connections,
          connections: storedConnections,
        },
      }));
    }
    setTimeout(() => {
      // setmounted(true)
      (async () => {
        try {
          let data = await fetch("http://localhost:5000/search/profile", {
            method: "POST",
            body: JSON.stringify({
              username: username.trim(),
            }),
            headers: {
              "Content-type": "application/json",
            },
          });

          let res = await data.json();
          if (res.success) {
            setUserProfile(res?.user);
            console.log(res?.user);
          } else {
            setUserProfile(false);
          }
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      })();
    }, 500);
  }, [username]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0]; // Get the selected file
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file); // Create a URL for the selected image
  //     setSelectedImage(imageUrl); // Update the selected image
  //     setSelectedImageFile(file);
  //   }
  // };

  // const handleImageUpload = async () => {
  //   // Check if there is a selected image
  //   if (!selectedImage) {
  //     return;
  //   }

  //   // Create a new FormData object to send the image to the server
  //   const formData = new FormData();
  //   formData.append("image", selectedImageFile); // Assuming "image" is the field name expected by your server

  //   try {
  //     // Send a POST request to your server to upload the image
  //     const response = await fetch(
  //       "http://localhost:5000/profileRoutes/profiles",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     if (response.ok) {
  //       // Image uploaded successfully, update the user's profile image
  //       // You can also update the image URL in your database
  //       console.log("Image uploaded successfully");
  //       // Clear the selectedImage state to remove the displayed image
  //       setSelectedImage(null);
  //     } else {
  //       console.error("Image upload failed");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };

  const connect = async () => {
    try {
      let user = jwtDecode(localStorage.getItem("token"));
      console.log(user);
  
      // Store the userProfile ID in a variable before making the fetch call
      const userProfileId = userProfile?._id;
  
      // Check if the target user is the same as the logged-in user
      if (userProfileId === user.userId) {
        console.log("Cannot connect to yourself");
        return; // Exit the function to prevent further execution
      }
  
      // Check if the connection already exists
      if (userProfile.connections.connections.includes(user.userId)) {
        console.log("Connection already exists");
        return; // Exit the function to prevent further execution
      }
  
      // Make the API call to send a connection request
      let data = await fetch(
        `http://localhost:5000/connection/send-request/${userProfileId}`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: user.userId,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
  
      let res = await data.json();
      if (res.message === "Connection request sent successfully") {
        console.log("Connection request sent successfully");
  
        // Update the connections count in the state for the logged-in user
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          connections: {
            ...prevProfile.connections,
            connections: [...prevProfile.connections.connections, user.userId],
          },
        }));
  
        // Check if the connection already exists in the target user's profile
        if (!userProfile.connections.connections.includes(userProfileId)) {
          // Update the connections count in the state for the target user
          setUserProfile((prevProfile) => ({
            ...prevProfile,
            connections: {
              ...prevProfile.connections,
              connections: [...prevProfile.connections.connections, userProfileId],
            },
          }));
        }
      } else {
        console.error("Connection request failed");
      }
  
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  
  
  
  



  console.log(userProfile);

  return (
    <div className="flex mx-40 flex-col lg:flex-row items-center py-8 lg:justify-between">
      {/* Left section: Profile details and follow button */}
      <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
        <img
          src={
            userProfile?.profileImage ||
            "http://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full mb-2"
        />
        <div className="text-center lg:text-left">
          <div className="font-bold text-xl mb-1">{userProfile?.username}</div>
          <div className="text-gray-600">@{userProfile?.username}</div>
          <div className="mt-2">
            <span
              className="mr-4 font-bold cursor-pointer"
             
            >
              {userProfile?.connections.connections.length} Connections
            </span>
          </div>
        </div>
        <button
          onClick={connect}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Connect
        </button>
      </div>
    </div>
  );
};

//Function to fetch user data by ID from your backend or database
// const fetchUserProfile = async (userId) => {
//   try {
//     const response = await fetch(`http://localhost:5000/profiles/${userId}`); // Replace with your API endpoint
//     if (!response.ok) {
//       throw new Error("User data not found");
//     }
//     const userProfile = await response.json();
//     console.log("Fetched user profile:", userProfile);
//     return userProfile;
//   } catch (error) {
//     throw error;
//   }
// };

// const sendConnectionRequest = async (userId) => {
//   try {
//     const response = await fetch(`http://localhost:5000/connect/${userId}`);
//     if (response.status === 200) {
//       // Handle the successful connection request
//       console.log("Connection request sent successfully");
//     } else {
//       console.error("Error sending connection request");
//     }
//   } catch (error) {
//     console.error("Error sending connection request:", error);
//   }
// };

// const Container = styled.div`
//   background-color: #fff;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   padding: 16px;
//   margin: 16px;
// `;

// const ProfileHeader = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const ProfileImage = styled.img`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   margin-bottom: 16px;
// `;

// const ProfileName = styled.h1`
//   font-size: 24px;
//   font-weight: bold;
// `;

// const ProfileContent = styled.div`
//   margin-top: 16px;
// `;





export default UserProfile;
