import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../admin/dto/login.dto';
import { AuthService } from './auth.service';
import { AdminLocalAuthGuard } from './guards/admin-local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminLocalAuthGuard)
  login(@Req() req: Express.Request, @Body() loginDto: LoginDto) {
    return this.authService.login(req);
  }

  @Get('admin/me')
  @UseGuards(AuthenticatedGuard)
  me(@Req() req: Express.Request) {
    return this.authService.me(req);
  }
}
