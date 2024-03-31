import { IsEmail, IsAlphanumeric, IsNotEmpty } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsAlphanumeric()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    password: string;
}
