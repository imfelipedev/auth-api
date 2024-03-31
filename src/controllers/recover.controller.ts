import { Body, Controller, Patch, Post } from "@nestjs/common";

import { RecoverDto } from "../dtos/recover/recover.dto";
import { ChangePasswordDto } from "../dtos/recover/change-password.dto";
import { RecoverService } from "../services/recover.service";

@Controller("/api/v1/recover")
export class RecoverController {
    constructor(private readonly recoverService: RecoverService) {}

    @Post()
    public async recover(@Body() recoverDto: RecoverDto): Promise<object> {
        return await this.recoverService.recover(recoverDto);
    }

    @Patch()
    public async changePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<object> {
        return await this.recoverService.changePassword(changePasswordDto);
    }
}
