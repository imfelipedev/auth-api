import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { UserService } from "./user.service";
import { EmailService } from "./email.service";
import { RecoverDto } from "../dtos/recover/recover.dto";
import { ChangePasswordDto } from "../dtos/recover/change-password.dto";
import { PrismaRepository } from "../repositories/prisma.repository";

@Injectable()
export class RecoverService {
    constructor(
        private readonly prismaRepository: PrismaRepository,
        private readonly userService: UserService,
        private readonly emailService: EmailService
    ) {}

    public async changePassword(changePasswordDto: ChangePasswordDto): Promise<object> {
        const recoverData = await this.prismaRepository.recoverys.findUnique({ where: { id: changePasswordDto.id } });
        if (!recoverData) {
            throw new HttpException("Recovery code not found.", HttpStatus.NOT_FOUND);
        }

        await this.prismaRepository.recoverys.delete({ where: { id: changePasswordDto.id } });

        const date = new Date();
        if (recoverData.expires_at <= date) {
            throw new HttpException("Recovery code expired.", HttpStatus.UNAUTHORIZED);
        }

        const password = await this.userService.hash(changePasswordDto.password);
        await this.userService.updatePasswordWhereID(recoverData.user_id, password);
        return { success: true };
    }

    public async recover(recoverDto: RecoverDto): Promise<object> {
        const userData = await this.userService.getFromEmail(recoverDto.email);
        if (!userData) {
            throw new HttpException("Account not found from email.", HttpStatus.NOT_FOUND);
        }

        const expires = this.getExpirationDate();
        const tokenData = await this.prismaRepository.recoverys.create({ data: { user_id: userData.id, expires_at: expires } });
        await this.emailService.send(userData.email, `${process.env.FRONT_END_URL}/recover/${tokenData.id}`);
        return { success: true };
    }

    private getExpirationDate(): Date {
        const date = new Date();
        const minutes = date.getMinutes();
        date.setMinutes(minutes + 10);
        return date;
    }
}
