import { IsEmail, IsNotEmpty } from "class-validator";

export class GetUserByLoginRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class GetUserByLoginResponse {

}
