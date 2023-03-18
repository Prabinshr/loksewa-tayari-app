import { Optional } from '@nestjs/common';
import {
    IsNotEmpty, IsString, IsEmail, Length
} from 'class-validator'

export class AuthDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3,20, {message: "Password has to be between 3 and 20 characters"})
    password: string;
}