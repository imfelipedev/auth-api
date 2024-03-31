import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { UserService } from "./user.service";
import { LoginDto } from "../dtos/auth/login.dto";
import { RegisterDto } from "../dtos/auth/register.dto";
import { PrismaRepository } from "../repositories/prisma.repository";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaRepository: PrismaRepository,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    public async verify(request: Request): Promise<object> {
        if (!request.cookies || !request.cookies["session-token"]) {
            throw new HttpException("Session-token not found.", HttpStatus.UNAUTHORIZED);
        }

        const token = await this.jwtService.verifyAsync(request.cookies["session-token"], { secret: process.env.JWT_SECRET });
        if (!token) {
            throw new HttpException("Unauthorized token.", HttpStatus.UNAUTHORIZED);
        }

        const userData = await this.userService.getFromEmail(token.email);
        if (!userData) {
            throw new HttpException("Account not foun from token.", HttpStatus.NOT_FOUND);
        }

        return { success: true, user: { username: userData.username, email: userData.email, features: userData.features } };
    }

    public async login(response: Response, loginDto: LoginDto): Promise<object> {
        const userData = await this.userService.getFromEmail(loginDto.email);
        if (!userData) {
            throw new HttpException("Account not found from email.", HttpStatus.NOT_FOUND);
        }

        const isPasswordMatch = await this.userService.compare(loginDto.password, userData.password);
        if (!isPasswordMatch) {
            throw new HttpException("Password not match", HttpStatus.UNAUTHORIZED);
        }

        const expires = this.getExpirationDate();
        const token = await this.jwtService.signAsync({ username: userData.username, email: userData.email });
        response.cookie("session-token", token, { expires: expires, secure: true, httpOnly: true, path: "/", sameSite: "none" });
        return { success: true };
    }

    public async register(registerDto: RegisterDto): Promise<object> {
        const isEmailAlreadyUsed = await this.userService.getFromEmail(registerDto.email);
        if (isEmailAlreadyUsed) {
            throw new HttpException("Email already used.", HttpStatus.BAD_REQUEST);
        }

        const password = await this.userService.hash(registerDto.password);
        await this.prismaRepository.users.create({ data: { username: registerDto.username, email: registerDto.email, password: password, features: [] } });
        return { success: true };
    }

    public async logout(request: Request, response: Response): Promise<object> {
        await this.verify(request);
        response.clearCookie("session-token");
        return { success: true };
    }

    private getExpirationDate(): Date {
        const date = new Date();
        const days = date.getDate();
        date.setDate(days + 7);
        return date;
    }
}
