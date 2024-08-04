import React, { useState } from 'react';
import axios from 'axios';  
import '../App.css';  
import { useNavigate } from 'react-router-dom';  

const CreatePost = ({ circleId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const author = localStorage.getItem('username'); 
  const navigate = useNavigate();  
  const base = "http://127.0.0.1:7001/circle/createPost";  

  const handleCreatePost = async(e) => {
    e.preventDefault();

    try{
      const response = await axios.post(base, {circleId,title,content,author});
      console.log(response.data);

      if(response.data.success){
        alert('发布成功');
        navigate('/HomePage');
      } else {
        alert('发布失败');
      } 
    }catch(error){
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div>
      <h1>Welcome</h1>
      <hr />
      <h2>水一贴</h2>
      <hr />  
      <form onSubmit={handleCreatePost}>
        <label>标题五个字:</label>
        <input type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title"/>

        <label>发布内容:</label>
        <textarea value={content} 
        onChange={(e) => setContent(e.target.value)} />
        <br />  
        <br />  
        <button type="submit">发布!</button>
      </form>
    </div>
  );
}

export default CreatePost;