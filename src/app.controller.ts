import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/decorators/public';
import { Authz } from './authz/decorators/action';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public() // So global JWT guard doesn't prohibit logins
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @Authz({ action: 'read', resource: 'profile' })
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('hello')
  @Public()
  getInfo() {
    return { hello: 'world' };
  }
}
