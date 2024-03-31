import { IsEmail, IsNotEmpty } from "class-validator";

export class RecoverDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
