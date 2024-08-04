import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircleList from './CircleList.jsx';
import CreateCircle from './CreateCircleForm.jsx';
import CreatePost from './CreatePostForm.jsx';
import PostDetail from './PostDetail.jsx';
import PostList from './PostList.jsx';
import MainPage from './MainPage.jsx';
import TopNavbar from './TopNavBar.jsx';
import useBackgroundChange from '../hooks/useBackground.jsx';

const HomePage = () => {
  const { gradient, changeGradient } = useBackgroundChange();

  useEffect(() => {
    document.documentElement.style.background = gradient;
  }, [gradient]);

  return (
    <div className='HomePage' >
      <TopNavbar changeGradient={changeGradient} />
      <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/CreateCircle" element={<CreateCircle />} />
        <Route path="/CircleList" element={<CircleList />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/PostList" element={<PostList />} />
        <Route path="/PostDetail" element={<PostDetail />} />
      </Routes>
      </div>
    </div>
  );
}

export default HomePage;