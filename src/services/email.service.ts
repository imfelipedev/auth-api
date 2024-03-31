import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    public async send(target: string, link: string): Promise<void> {
        await this.mailerService.sendMail({
            to: target,
            from: process.env.EMAIL_USERNAME,
            subject: "Recupere sua senha - Webisite Demonstration",
            html: `<h1 style="color: black">${link} (<a href="${link}" style="color: blue">Clique aqui para recuperar sua senha</a>)</h1>`,
        });
    }
}
