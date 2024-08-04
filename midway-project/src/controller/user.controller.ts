import { Controller, Inject, Post, Body} from '@midwayjs/core';
import { UserService } from "../service/user.service";
import { UserBody } from "../entities/user.entities";

@Controller('/user')
export class UserController {
    //inject as a example
    @Inject()
    userService: UserService;

    @Post('/register')
    async register(@Body() body : UserBody) : Promise<{ success: boolean; message: string}> {
        const { username, password } = body;
        const result = await this.userService.register(username, password,false);
        return result;
    }
    
    @Post('/login')
    async login(@Body() body : UserBody) : Promise<{ success: boolean; message: string}> {
        const result = await this.userService.login(body);
        return result;
    }

    @Post('/logout')
    async logout(@Body() body : UserBody) : Promise<{ success: boolean; message: string}> {
        const result = await this.userService.logout(body);
        return result;
    }
}