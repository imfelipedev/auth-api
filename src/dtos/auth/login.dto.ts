import { IsAlphanumeric, IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    password: string;
}
