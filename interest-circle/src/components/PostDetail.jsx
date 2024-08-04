import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import '../App.css';  

const PostDetail = ({ postId }) => {
  const [post, setPost] = useState(null);
  const base = "http://127.0.0.1:7001/circle"; 
  
  const fetchPost = async(postId) => {
    try{
      const response = await axios.get(`${base}/listPosts/${postId}`);
      if(response.data.success){
        setPost(response.data.data);
        return response.data;
      }else{
        alert('Failed to fetch post');
      }
    }catch(error){
      console.error(error);
      alert('Failed to fetch post');
    }
  };

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Author: {post.author}</p>
    </div>
  );
}

export default PostDetail;