import React, { useState } from 'react';  
import axios from 'axios';  
import '../App.css';  
import { useNavigate } from 'react-router-dom';  

function LoginForm() {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();  
  const base = "http://127.0.0.1:7001/user/login";  
  
  const handleLogin = async (e) => {  
    e.preventDefault();  
  
    try {  
      const response = await axios.post(base, { username, password, isOnline: true});  
      console.log(response.data);  
  
      if (response.data.success) {  
        localStorage.setItem('authToken', true);  
        localStorage.setItem('username', username); 
        navigate('/HomePage');  
      } else {  
        alert('登录失败,请注册');  
      }  
    } catch (error) {  
      console.error(error);  
      alert('An error occurred');  
    }  
  };  
  
  const handleRegisterNavigation = () => {  
    navigate('/RegisterForm');  
  };  
  
  return (  
    <div>  
      <h1>Welcome</h1>
      <hr /> 
      <div>  
        <img src="/images/pageIcon.gif" className="logo" alt="logo" />  
      </div>  
      <hr />  
      <h2>Login</h2>  
  
      <form onSubmit={handleLogin}>  
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
          <button type="submit">登录</button>  
          <button type="button" onClick={handleRegisterNavigation}>注册</button>  
        </div>  
      </form>  
    </div>  
  );  
}  
  
export default LoginForm;