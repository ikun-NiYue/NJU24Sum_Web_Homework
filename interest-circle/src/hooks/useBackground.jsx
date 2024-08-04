import {useState} from 'react';

//生成颜色
function generateRandomColor() {  
  const r = Math.floor(Math.random() * 200 + 55);  
  const g = Math.floor(Math.random() * 200 + 55);  
  const b = Math.floor(Math.random() * 200 + 55);  
  return `rgba(${r}, ${g}, ${b}, 0.88)`;  
}  
//生成背景渐变色
function generateRandomGradient() {  
  const startColor = generateRandomColor();  
  const endColor = generateRandomColor();  
  const degree = Math.floor(Math.random() * 120 + 30);  
  return `linear-gradient(${degree}deg, ${startColor}, ${endColor})`;  
}  
//改变背景色
function useBackgroundChanger() {  
  const [gradient, setGradient] = useState(generateRandomGradient());  
  
  const changeGradient = () => {  
    setGradient(generateRandomGradient());  
  };  
  //Hook返回信息给App,不直接操作DOM
  return {gradient,changeGradient};
}  

export default useBackgroundChanger;