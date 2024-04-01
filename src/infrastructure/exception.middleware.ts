import { BaseExceptionFilter } from "@nestjs/core";
import { Catch, ArgumentsHost, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).json({
            statusCode: status,
            message: (exception.response && exception.response.message) || exception.message || "Internal Server Error",
        });
    }
}
