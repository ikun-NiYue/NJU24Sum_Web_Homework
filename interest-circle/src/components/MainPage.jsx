import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import '../App.css';  

const MainPage = () => {
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
        alert('没圈子（）');
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
    joinCircle(circleId, username).then(response => {
      alert('Successfully joined the circle');
      fetchCircles().then(response => {
        setCircles(response.data);
      });
    }).catch(error => {
      console.error(error);
      alert('Failed to join the circle');
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Circles</h2>
      <ul>
        {circles.map(circle => (
          <li key={circle.id} className="mb-4 p-4 bg-gray-100 rounded shadow">
            <h3 className="text-xl">{circle.name}</h3>
            <p>{circle.description}</p>
            <p>Creator: {circle.creator}</p>
            <p>Members: {circle.numTotalMembers}</p>
            <button onClick={() => handleJoin(circle.id)} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Join Circle</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainPage;