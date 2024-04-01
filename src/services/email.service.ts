import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    public async send(target: string, link: string): Promise<void> {
        const html = this.getHtmlTemplate(link);
        await this.mailerService.sendMail({
            to: target,
            from: process.env.EMAIL_USERNAME,
            subject: "Recover your password - Webisite Demonstration",
            html: html,
        });
    }

    private getHtmlTemplate(link: string): string {
        return `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password recovery</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                        .container { max-width: 600px; margin: 50px auto; background-color: #f4f4f4; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                        h2 { color: #8930FA; }
                        p { color: #333; line-height: 1.6; }
                        a { display: inline-block; padding: 10px 20px; background-color: #8930FA; border-style: solid; border-color: #8930FA; border-width: 1.5px; border-radius: 8px; }
                        a:hover { background-color: #f4f4f4; color: #8930FA; text-decoration: none; }
                    </style>
                </head>
                
                <body>
                    <div class="container">
                        <h2>
                            Password recovery
                        </h2>

                        <p>
                            You have requested to reset your password. To continue, click the link below:
                        </p>

                        <p>
                            <a href="${link}" style="color: #ffffff; text-decoration: none;">
                                Redefine password
                            </a>
                        </p>

                        <p>
                            If you have not requested this change, you can ignore this email.
                        </p>

                        <p>
                            Thanks,
                            <br>
                            Support Team
                        </p>
                    </div>
                </body>
            </html>
        `;
    }
}
