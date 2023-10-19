import React, { useState, useEffect } from "react";
import Post from "./Post";
import Feed from "./Feed";
import jwtDecode from "jwt-decode";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    name: "",
    message: "",
  });

  const [userprofile,setuserprofile] = useState({});

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);// Check the console for the decoded token
      setuserprofile(decodedToken)
      fetchPostsFromLocalStorage();
    }
    fetchPostsFromLocalStorage()
  }, []);
  
    // Function to fetch posts data from localStorage when the component mounts
    const fetchPostsFromLocalStorage = async() => {
      try {
        let data = await fetch("http://localhost:5000/postRoutes/getposts");
  
        let res = await data.json();
        if(res.success){
          setPosts(res?.newPost);
        }else{
          setPosts([]);
        }
      } catch (error) {
        console.log("Hello");
        console.log(error)
        setPosts([])
      }
        
    };

  return (
    <div className="main-container">
      <Feed
        newPost={newPost}
        setNewPost={setNewPost}
        setPosts={setPosts}
        fetchPostsFromLocalStorage={fetchPostsFromLocalStorage}
        posts={posts}
      />
      
      {posts.map((post, index) => {
        return <Post
          key={index}
          postid={post._id}
          name={post.name}
          description={post.description}
          message={post.message}
          isLiked={post?.likes?.includes(userprofile?.userId)}
          id={userprofile?.userId}
          totallikes={post?.likes.length}
          // isLiked={false}
          photourl={
            "https://icon-library.com/images/user-icon-jpg/user-icon-jpg-28.jpg"
          }
        />
        })}
    </div>
  );
};

export default Main;
