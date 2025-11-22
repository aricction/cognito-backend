import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CommonService {

    async hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password, 10);
    }

    async ComparePassword(password: string, hash: string): Promise<boolean>{
        return bcrypt.compare(password, hash);

    }
//success response
     success(message: string, data?: any) {
    return {
      status: 'success',
      message,
      data: data || null,
    };
  }

   //error response
   error(message: string, code = 400) {
    return {
      status: 'error',
      message,
      code,
    };
  }

   paginate(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return { skip, limit };
  }
}

