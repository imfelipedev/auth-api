import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MailerModule } from "@nestjs-modules/mailer";

import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { EmailService } from "./services/email.service";
import { RecoverService } from "./services/recover.service";
import { AuthController } from "./controllers/auth.controller";
import { RecoverController } from "./controllers/recover.controller";
import { PrismaRepository } from "./repositories/prisma.repository";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "7day" },
        }),
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            },
        }),
    ],
    controllers: [AuthController, RecoverController],
    providers: [AuthService, RecoverService, UserService, EmailService, PrismaRepository],
})
export class AppModule {}
