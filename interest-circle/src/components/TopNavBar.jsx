import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import '../App.css';

const TopNavbar = ({ changeGradient }) => {
  //处理按钮并跳转
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); 

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    navigate('/LoginForm');
  };
  return (
    <nav className='topNav'>
      <ul className="flex space-x-4 p-4 bg-gray-800 text-white">
      <li>
          <NavLink to="/MainPage" className={({ isActive }) => isActive ? "text-yellow-500" : undefined}>动力牛牛</NavLink>
        </li>
        <li>
          <NavLink to="/MainPage/CircleList" className={({ isActive }) => isActive ? "text-yellow-500" : undefined}>广场</NavLink>
        </li>
        <li>
          <NavLink to="/MainPage/CreateCircle" className={({ isActive }) => isActive ? "text-yellow-500" : undefined}>创建圈子</NavLink>
        </li>
        <li>
          <NavLink to="/MainPage/CreatePost" className={({ isActive }) => isActive ? "text-yellow-500" : undefined}>发布</NavLink>
        </li>
        <li>
          <NavLink to="/MainPage/PostList" className={({ isActive }) => isActive ? "text-yellow-500" : undefined}>帖子列表</NavLink>
        </li>
        <li> 
        <NavLink to="/MainPage/PostDetail/:postId" className={({ isActive }) => isActive ? "text-yellow-500" : undefined}>查看</NavLink>
        </li>
        <li>
          <button onClick={changeGradient} className="bg-blue-500 text-white px-4 py-2 rounded">更改背景</button>
        </li>
        <li>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">退出登录</button>
        </li>
        <div className="text-white">
          欢迎, {username}
        </div>
      </ul>
    </nav>
  );
}

export default TopNavbar;