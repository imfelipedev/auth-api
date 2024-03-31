import { Request, Response } from "express";
import { Controller, Post, Body, Req, Res, Get, Delete } from "@nestjs/common";

import { LoginDto } from "../dtos/auth/login.dto";
import { RegisterDto } from "../dtos/auth/register.dto";
import { AuthService } from "../services/auth.service";

@Controller("/api/v1/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    public async verify(@Req() request: Request): Promise<object> {
        return await this.authService.verify(request);
    }

    @Post("/login")
    public async login(@Res({ passthrough: true }) response: Response, @Body() loginDto: LoginDto): Promise<object> {
        return await this.authService.login(response, loginDto);
    }

    @Post("/register")
    public async register(@Body() registerDto: RegisterDto): Promise<object> {
        return await this.authService.register(registerDto);
    }

    @Delete("/logout")
    public async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<object> {
        return await this.authService.logout(request, response);
    }
}
