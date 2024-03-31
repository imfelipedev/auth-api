import bcryptjs from "bcryptjs";
import { users } from "@prisma/client";
import { Injectable } from "@nestjs/common";

import { PrismaRepository } from "../repositories/prisma.repository";

@Injectable()
export class UserService {
    constructor(private readonly prismaRepository: PrismaRepository) {}

    public async getFromID(id: string): Promise<users | null> {
        const result = await this.prismaRepository.users.findUnique({ where: { id: id } });
        return result;
    }

    public async getFromEmail(email: string): Promise<users | null> {
        const result = await this.prismaRepository.users.findUnique({ where: { email: email } });
        return result;
    }

    public async updatePasswordWhereID(id: string, password: string): Promise<users | null> {
        const result = await this.prismaRepository.users.update({ where: { id: id }, data: { password: password } });
        return result;
    }

    public async compare(password: string, storePassword: string): Promise<boolean> {
        return await bcryptjs.compare(password, storePassword);
    }

    public async hash(password: string): Promise<string> {
        return await bcryptjs.hash(password, 10);
    }
}
