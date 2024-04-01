import cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./module";
import { AllExceptionsFilter } from "./infrastructure/exception.middleware";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: ["http://localhost", "http://localhost:5173", process.env.FRONT_END_URL],
            allowedHeaders: ["Content-Type"],
            methods: "GET,PATCH,POST,DELETE,OPTIONS",
            credentials: true,
        },
    });
    const cookies = cookieParser();
    const validator = new ValidationPipe();
    const exception = new AllExceptionsFilter();
    app.use(cookies);
    app.useGlobalPipes(validator);
    app.useGlobalFilters(exception);

    await app.listen(3000);
    console.log("✅ - Server running on 0.0.0.0:3000");
}

bootstrap();
