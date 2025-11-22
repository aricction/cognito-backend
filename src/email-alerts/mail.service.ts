import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const { EMAIL_USER, EMAIL_PASS } = process.env;

@Injectable()
export class MailAlertService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  async sendOTP(to: string, otp: string) {
    try {
      const mailOptions = {
        from: EMAIL_USER,
        to,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}`,
        html: `
          <h2>OTP Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="color:#4CAF50;">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        `,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log(`OTP email sent to ${to}`);

      return result;
    } catch (error) {
      console.log('Error sending OTP email:', error);
      throw error;
    }
  }

  async sendEmail(to: string, subject: string, html: string, text?: string) {
    try {
      const mailOptions = {
        from: EMAIL_USER,
        to,
        subject,
        text: text || subject,
        html,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}: ${subject}`);

      return result;
    } catch (error) {
      console.log('Error sending email:', error);
      throw error;
    }
  }
}
