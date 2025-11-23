import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';

const { SENDGRID_API_KEY, EMAIL_USER } = process.env;

@Injectable()
export class MailAlertService {
  private readonly sendGridApiKey: string;
  private readonly emailUser: string;

  constructor() {
    if (!SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not defined in environment variables');
    }
    if (!EMAIL_USER) {
      throw new Error('EMAIL_USER is not defined in environment variables');
    }
    this.sendGridApiKey = SENDGRID_API_KEY;
    this.emailUser = EMAIL_USER;
    sgMail.setApiKey(this.sendGridApiKey);
  }

  async sendOTP(to: string, otp: string) {
    const msg = {
      to,
      from: this.emailUser,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
      html: `
        <h2>OTP Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="color:#4CAF50;">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log(`OTP email sent to ${to}`);
      return { success: true };
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw error;
    }
  }

  async sendEmail(to: string, subject: string, html: string, text?: string) {
    const msg = {
      to,
      from: this.emailUser,
      subject,
      text: text || subject,
      html,
    };

    try {
      await sgMail.send(msg);
      console.log(`Email sent to ${to}: ${subject}`);
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
