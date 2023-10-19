import { Avatar } from "antd";
import React, { useState } from "react"; // Import useState
import "./Post.css";
import { HeartFilled,HeartOutlined } from "@ant-design/icons";
// import { MessageOutlined } from "@ant-design/icons";
// import { ShareAltOutlined } from "@ant-design/icons";
// import { SendOutlined } from "@ant-design/icons";
import InputOption from "./inputOption"; // Assuming you have the correct path for InputOption

function Post({ name, message, photourl,postid,isLiked,totallikes,id }) {
  const [liked, setLiked] = useState(isLiked); // State to track whether post is liked
  const [totallikesall,settotallikesall] = useState(totallikes)

  const handleLike =async () => {
    console.log(postid)
     try {
      let data = await fetch("http://localhost:5000/likedislike/like", {
        method: "POST",
        body: JSON.stringify({
          postid: postid,
          id: id,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      let res = await data.json();
      if(res.success){
        settotallikesall(totallikes + 1)
        setLiked(true)
        console.log(res)
      }else{
      }
      console.log(res);
    } catch (error) {}
      
    setLiked(!liked);
  };

  const handledisLike =async () => {
    console.log(postid)
     try {
      let data = await fetch("http://localhost:5000/likedislike/dislike", {
        method: "POST",
        body: JSON.stringify({
          postid: postid,
          id: id
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      let res = await data.json();
      if(res.success){
        settotallikesall(totallikes - 1)
        setLiked(false)
        console.log(res)
      }else{
      }
      console.log(res);
    } catch (error) {}
      
    setLiked(!liked);
  };



  return (
    <div className="post">
      <div className="post_header">
        <Avatar src={photourl} />
        <div className="post_info">
          <h2>{name}</h2>
        </div>
      </div>
      <div className="post_body">
        <p>{message}</p>
      </div>
      <div className="post_buttons">
       {liked ? <InputOption
          Icon={HeartFilled}
          title={`Like (${totallikesall})`} // Display the number of likes
          color="blue" // Change color to red when liked
          onClick={handledisLike} // Call handleLike when the like button is clicked
        /> :
        <InputOption
          Icon={HeartOutlined}
          title={`Like (${totallikesall})`} // Display the number of likes
          color="red" // Change color to red when liked
          onClick={handleLike} // Call handleLike when the like button is clicked
        />}
        {/* <InputOption Icon={MessageOutlined} title="Chat" color="green" />
        <InputOption Icon={ShareAltOutlined} title="Share" color="orange" />
        <InputOption Icon={SendOutlined} title="Send" color="blue" /> */}
      </div>
    </div>
  );
}

export default Post;

  