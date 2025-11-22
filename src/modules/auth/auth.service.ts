function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function otpExpiry(): Date {
  return new Date(Date.now() + 5 * 60 * 1000);
}

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CommonService } from '@/common/common.service';
import { CreateUserByRegisterRequest } from './data-transfer-objects/register.dto';
import { GetUserByLoginRequest } from './data-transfer-objects/login.dto';
import {VerifyOtpDto} from './data-transfer-objects/verify-otp.dto'
import { MailAlertService } from '@/email-alerts/mail.service';
import * as jwt from "jsonwebtoken";


@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private commonService: CommonService,
        private mailService: MailAlertService,

  ) {}

  async register(dto: CreateUserByRegisterRequest) {
    const otp = generateOTP();

    const existingUser = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await this.commonService.hashPassword(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });

    // TODO → Send OTP email with nodemailer here

    return this.commonService.success('User registered successfully', {
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }

  async login(dto: GetUserByLoginRequest) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException("Invalid email or password");

    const isValid = await this.commonService.ComparePassword(
      dto.password,
      user.password
    );

    if (!isValid) throw new UnauthorizedException("Invalid email or password");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return this.commonService.success("login successful", {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  }

    async sendOtp(email: string) {
    // Check if user exists
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Generate OTP
    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save OTP + expiry
    await this.prismaService.user.update({
      where: { email },
      data: {
        otp,
        otpExpiry: expiry,
      },
    });

    // Send email
    await this.mailService.sendOTP(email, otp);

    return {
      status: 'success',
      message: 'OTP sent to your email',
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
  const { email, otp } = dto;

  const user = await this.prismaService.user.findUnique({ where: { email } });

  if (!user) {
    throw new BadRequestException("User not found");
  }

  if (!user.otp || !user.otpExpiry) {
    throw new BadRequestException("OTP not generated");
  }

  // Check expiry
  if (user.otpExpiry < new Date()) {
    throw new BadRequestException("OTP expired");
  }

  // Check OTP match
  if (user.otp !== otp) {
    throw new BadRequestException("Invalid OTP");
  }

  // Clear OTP once verified
  await this.prismaService.user.update({
    where: { email },
    data: {
      otp: null,
      otpExpiry: null,
    },
  });

  return {
    status: "success",
    message: "OTP Verified Successfully",
  };
}

}
