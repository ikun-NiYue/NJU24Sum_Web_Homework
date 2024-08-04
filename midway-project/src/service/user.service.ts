import { Provide } from '@midwayjs/core';
import { UserBody } from '../entities/user.entities';
import * as fs from 'fs';

@Provide()
export class UserService {

  async register(username : string, password : string, isOnline : boolean) : Promise<{success: boolean; message: string}>{
    try{
      let users : Array<{username: string; password: string ; isOnline : boolean; }> = [];
      try{
        users = JSON.parse(fs.readFileSync('./src/users.json', 'utf-8'));
        if (!Array.isArray(users)) {
          throw new Error('users.json does not contain a valid array');
        }
      }catch(parseError){
        console.warn('users.json file is empty, does not exist, or is not in a valid JSON array format. Using an empty array.');
      }

      //检查用户名是否存在
      const userFind = users.find((user) => user.username === username);
    if (userFind) {
      return { success: false, message: '用户名已存在' };
    }
      //创建数组，将新用户添加到数组中并写回文件
      const newUser = {
        username,
        password,
        isOnline
      };
      users.push(newUser);

      fs.writeFileSync('./src/users.json', JSON.stringify(users, null, 2), 'utf-8');
      return { success: true, message: '注册成功' }; 
    }catch(error){
      return { success: false, message: 'Failed to register user: ' + error.message };  
    }
  }

  async login(body : UserBody): Promise<{ success: boolean; message: string}> {
    const { username, password } = body;
    let users : Array<{ username: string; password: string ; isOnline : boolean;}> = [];

    try {  
      users = JSON.parse(fs.readFileSync('./src/users.json', 'utf-8'));
      const userFind = users.find((user: { username: string; password: string }) => user.username === username && user.password === password);   
      if (userFind) {  
        userFind.isOnline = true;  
        fs.writeFileSync('./src/users.json', JSON.stringify(users, null, 2), 'utf-8');  
        return { success: true, message: '登录成功' };  
      } else {  
        return { success: false, message: '用户名或密码错误' };  
      }  
    } catch (error) {  
      return { success: false, message: '登录失败: ' + error.message };  
    }  
  }

  async logout(body : UserBody): Promise<{ success: boolean; message: string}> {
    const { username, password } = body;
    let users : Array<{ username: string; password: string ; isOnline : boolean;}> = [];

    try {  
      users = JSON.parse(fs.readFileSync('./src/users.json', 'utf-8'));
      const userFind = users.find((user: { username: string; password: string }) => user.username === username && user.password === password);   
      if (userFind) {  
        userFind.isOnline = false;  
        fs.writeFileSync('./src/users.json', JSON.stringify(users, null, 2), 'utf-8');  
        return { success: true, message: '登出成功' };  
      } else {  
        return { success: false, message: '#丸辣#' };  
      }  
    } catch (error) {  
      return { success: false, message: '登出失败: ' + error.message };  
    }  
  }
}