import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import '../App.css';  

const CircleList = () => {
  const [circles, setCircles] = useState([]);
  const username = localStorage.getItem('username');  
  const base = "http://127.0.0.1:7001/circle"; 

  const fetchCircles = async() => {
    try{
      const response = await axios.get(`${base}/list`);
      if(response.data.success){
        setCircles(response.data.data);
        return response.data;
      }else{
        alert('Failed to fetch circles');
      }
    }catch(error){
      console.error(error);
      alert('Failed to fetch circles');
    }
  };

  const joinCircle = async(circleId) => {
    try{
      const response = await axios.post(`${base}/join/${circleId}`, {username});
      if(response.data.success){
        alert('欢迎新成员喵~');  
        await fetchCircles(); 
      }else{
        alert('Failed to join circle');
      }
    }catch(error){
      console.error('Failed to join circle:', error);  
      alert('加入失败');
    }
  }

  useEffect(() => {
    fetchCircles();
  }, []);

  const handleJoin = (circleId) => {
    joinCircle(circleId);
  };

  return (
    <div>
      <h2>兴趣圈广场</h2>
      <ul>
        {circles.map(circle => (
          <li key={circle.id}>
            <h3>{circle.name}</h3>
            <p>{circle.description}</p>
            <button onClick={() => handleJoin(circle.id)}>加入</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CircleList;