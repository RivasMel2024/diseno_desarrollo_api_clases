// import { Body, Controller, UnauthorizedException, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//     constructor(private authService: AuthService) { }

//     @Post('login')
//     login(@Body() body: { email: string; password: string }) {
//         const user = this.authService.validateUser(body.email, body.password);
//         if (!user) throw new UnauthorizedException();
//         return this.authService.login(user);
//     }
// }

import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(){
        //redirige a google
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req){
        return {
            message: 'Login exitoso con Google',
            user: req.user,
        };
    }
}
//http://localhost:3000/auth/google
//http://localhost:3000/auth/google/redirect