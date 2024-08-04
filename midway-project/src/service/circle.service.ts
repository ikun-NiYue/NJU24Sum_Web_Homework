import { Provide, Inject} from "@midwayjs/core";
import { CircleBody, Member } from "../entities/circle.entities";
import { PostBody } from "../entities/posts.entities";
import { UserService } from "./user.service";
import * as fs from 'fs';

@Provide()
export class CircleService {
  @Inject()
  userService: UserService;

  //创建兴趣圈
  async createCircle(name: string, creator: string, description: string):Promise<{CircleBody:CircleBody,success: boolean; message: string}> {
    try{
      let circles : Array<CircleBody> = [];
      try{
        circles = JSON.parse(fs.readFileSync('./src/circles.json', 'utf-8'));
        if (!Array.isArray(circles)) {
          throw new Error('circles.json does not contain a valid array');
        }
      }catch(parseError){
        console.warn('circles.json file is empty, does not exist, or is not in a valid JSON array format. Using an empty array.');
      }
      const newCircle = {
        id: circles.length + 1,
        name,
        description,
        creator,
        members: [{ username: creator, isOnline: true }],
        numTotalMembers: 1,
        numTotalOnline: 1,
      };
      circles.push(newCircle);
      fs.writeFileSync('./src/circles.json', JSON.stringify(circles, null, 2), 'utf-8');
      return {CircleBody: newCircle, success: true, message: '创建成功' };
    }catch(error){
      return {CircleBody: null, success: false, message: 'Failed to create circle: ' + error.message };
    }
  }
  //兴趣圈列表
  async listCircles(): Promise<CircleBody[]> {
    const circles : Array<CircleBody> = JSON.parse(fs.readFileSync('./src/circles.json', 'utf-8'));
    return circles;
  }
  //加入兴趣圈
  async joinCircle(circleId: number, username: string): Promise<{CircleBody:CircleBody,success: boolean; message: string}>  {
    try{
      const circles : Array<CircleBody> = JSON.parse(fs.readFileSync('./src/circles.json', 'utf-8'));
      const circle = circles.find((c: CircleBody) => c.id === circleId);
      if (!circle) {
        return {CircleBody: null, success: false, message: '没这个圈子捏' };
      }
      const member = circle.members.find((m: Member) => m.username === username);
      if (!member) {
        circle.members.push({ username, isOnline: true });
        circle.numTotalMembers += 1;
      }
      fs.writeFileSync('./src/circles.json', JSON.stringify(circles, null, 2), 'utf-8');
      return {CircleBody: circle, success: true, message: '加入成功' };
    }catch(error){
      return {CircleBody: null, success: false, message: 'Failed to join circle: ' + error.message };
    }
  }
  //发帖
  async createPost(circleId: number, author:string, title: string, content: string): Promise<{PostBody : PostBody, success: boolean; message: string}> {
    try{
      let posts : Array<PostBody> = [];

      try{
        posts = JSON.parse(fs.readFileSync('./src/posts.json', 'utf-8'));
        if (!Array.isArray(posts)) {
          throw new Error('posts.json does not contain a valid array');
        }
      }catch(parseError){
        console.warn('posts.json file is empty, does not exist, or is not in a valid JSON array format. Using an empty array.');
      }
      const newPost = {
        id: posts.length + 1,
        circleId,
        author,
        title,
        content,
      };
      posts.push(newPost);
      fs.writeFileSync('./src/posts.json', JSON.stringify(posts, null, 2), 'utf-8');
      return {PostBody: newPost, success: true, message: '发帖成功' };
    }catch(error){
      return {PostBody: null, success: false, message: 'Failed to create post: ' + error.message };
    }
  }
  //帖子列表
  async listPosts(circleId: number): Promise<PostBody[]> {
    const posts : Array<PostBody> = JSON.parse(fs.readFileSync('./src/posts.json', 'utf-8'));
    return posts.filter((post: PostBody) => post.circleId === circleId);
  }
  //获取帖子
  async getPost(postId: number): Promise<{PostBody: PostBody,success: boolean; message: string}> {
    try{
      const posts : Array<PostBody> = JSON.parse(fs.readFileSync('./src/posts.json', 'utf-8'));
      const post = posts.find((p: PostBody) => p.id === postId);
      if (!post) {
        return {PostBody: null, success: false, message: '没这个帖子捏' };
      }
      return {PostBody: post, success: true, message: '获取成功' };
    }catch(error){
    return {PostBody: null, success: false, message: 'Failed to get post: ' + error.message };
    }
  }
}