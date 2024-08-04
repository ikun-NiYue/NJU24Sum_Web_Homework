import { Controller, Post, Get, Body, Param, Inject } from "@midwayjs/core";
import { CircleService } from '../service/circle.service';
import { CircleBody } from '../entities/circle.entities';
import { PostBody } from '../entities/posts.entities';

@Controller('/circle')
export class CircleController {
  @Inject()
  circleService: CircleService;

  @Post('/create')
  async createCircle(@Body() body: CircleBody): Promise<{CircleBody:CircleBody,success: boolean; message: string}> {
    const {name, description, creator} = body;
    const result = await this.circleService.createCircle(name, description, creator);
    return result;
  }

  @Get('/list')
  async listCircles(): Promise<CircleBody[]> {
    const result = await this.circleService.listCircles();
    return result;
  }

  @Post('/join/:circleId')
  async joinCircle(@Param('circleId') circleId: number, @Body('username') username: string): Promise<{CircleBody:CircleBody,success: boolean; message: string}> {
    const result = await this.circleService.joinCircle(circleId, username);
    return result;
  }

  @Post('/createPost')
  async createPost(@Body() body: PostBody): Promise<{PostBody: PostBody, success: boolean; message: string}> {
    const { circleId, title, content, author } = body;
    const result = await this.circleService.createPost(circleId, title, content, author);
    return result;
  }

  @Get('/listPosts/:circleId')
  async listPosts(@Param('circleId') circleId: number): Promise<PostBody[]> {
    const result = await this.circleService.listPosts(circleId);
    return result;
  }

  @Get('/getPost/:postId')
  async getPost(@Param('postId') postId: number): Promise<{PostBody: PostBody,success: boolean; message: string}> {
    const result = await this.circleService.getPost(postId);
    return result;
  }
}