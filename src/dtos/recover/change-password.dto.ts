import { IsAlphanumeric, IsNotEmpty, IsUUID } from "class-validator";

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    password: string;
}
