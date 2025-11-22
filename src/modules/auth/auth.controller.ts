import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserByRegisterRequest } from './data-transfer-objects/register.dto';
import { GetUserByLoginRequest } from './data-transfer-objects/login.dto';
import {VerifyOtpDto} from './data-transfer-objects/verify-otp.dto';
import {SendOtpDto} from './data-transfer-objects/send-otp.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserByRegisterRequest) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: GetUserByLoginRequest) {
    return this.authService.login(dto);
  }

@Post('send-otp')
sendOtp(@Body() dto: SendOtpDto) {
  return this.authService.sendOtp(dto.email);
}


 @Post('verify-otp')
verify(@Body() dto: VerifyOtpDto) {
  return this.authService.verifyOtp(dto);
}
}
