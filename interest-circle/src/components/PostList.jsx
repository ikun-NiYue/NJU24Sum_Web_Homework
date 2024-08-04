import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';  

const PostList = ({ circleId }) => {
  const [posts, setPosts] = useState([]);
  const base = "http://127.0.0.1:7001/circle"; 

  const fetchPosts = async(circleId) => {
    try{
      const response = await axios.get(`${base}/listPosts/${circleId}`);
      if(response.data.success){
        setPosts(response.data.data);
        return response.data;
      }else{
        alert('Failed to fetch posts');
      }
    }catch(error){
      console.error(error);
      alert('Failed to fetch posts');
    }
  };

  useEffect(() => {
    fetchPosts(circleId);
  }, [circleId]);

  return (
    <div>
      <h2>帖子</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;