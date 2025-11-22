import {IsEmail, IsNotEmpty, MinLength} from  "class-validator";


export class CreateUserByRegisterRequest{
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}


export class CreateUserByRegisterResponse{
   @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
  
}