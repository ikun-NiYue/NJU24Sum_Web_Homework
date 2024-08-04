import React, { useState } from 'react';
import axios from 'axios';  
import '../App.css';  
import { useNavigate } from 'react-router-dom';  

const CreateCircle = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();  
  const base = "http://127.0.0.1:7001/circle/create";  

  const handleCreateCircle = async(e) => {
    e.preventDefault();

    try{
      const response = await axios.post(base, { name, description, creator: localStorage.getItem('username')});
      console.log(response.data);

      if(response.data.success){
        alert('创建成功');
        navigate('/HomePage');
      } else {
        alert('创建失败');
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
      <h2>建一个圈子</h2>
      <hr />  
      <form onSubmit={handleCreateCircle}>
        <label>圈子名称:</label>
        <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name"/>
        <label>圈子描述:</label>
        <textarea value={description} 
        onChange={(e) => setDescription(e.target.value)} />
        <br />  
        <br />  
        <button type="submit">创建!</button>
      </form>
    </div>
  );
}

export default CreateCircle;