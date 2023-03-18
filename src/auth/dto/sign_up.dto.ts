import { IsNotEmpty, IsString } from "class-validator";
import { AuthDto } from "./auth.dto";
import { Optional } from '@nestjs/common';

export class SignupDto extends AuthDto{

    @IsNotEmpty()
    @IsString()
    @Optional()
    username: string;
}