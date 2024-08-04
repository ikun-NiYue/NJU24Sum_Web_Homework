import React, { useState } from 'react';  
import axios from 'axios';  
import '../App.css';  
import { useNavigate } from 'react-router-dom';  
  
function RegisterForm() {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();  
  const base = "http://127.0.0.1:7001/user/register";  
  
  const handleRegister = async (e) => {  
    e.preventDefault();  
  
    try {  
      const response = await axios.post(base, { username, password, isOnline: false});  
      console.log(response.data);  
  
      if (response.data.success) {  
        localStorage.setItem('authToken', true);
        console.log('注册成功, 返回登录');  
        navigate('/LoginForm');
      } else {  
        alert('注册失败');  
      }  
    } catch (error) {  
      console.error(error);  
      alert('An error occurred');  
    }  
  };  
  
  return (  
    <div>  
      <h1>Welcome</h1>
      <hr />
      <h2>注册账号</h2>  
      <hr />  
  
      <form onSubmit={handleRegister}>  
        <label>账号: </label>  
        <input  
          type="text"  
          value={username}  
          onChange={(e) => setUsername(e.target.value)}  
          placeholder="Username"  
        />  
        <label>密码: </label>  
        <input  
          type="password"  
          value={password}  
          onChange={(e) => setPassword(e.target.value)}  
          placeholder="Password"  
          autoComplete="off"  
        />  
        <br />  
        <br />  
        <div>  
          <button type="submit">注册</button>  
        </div>  
      </form>  
    </div>  
  );  
}  
  
export default RegisterForm;