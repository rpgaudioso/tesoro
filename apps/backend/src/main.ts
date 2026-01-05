import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as path from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false, // Permitir campos não listados para compatibilidade com Zod types
    })
  );

  // Servir arquivos estáticos do diretório de uploads
  // When running npm run dev in apps/backend, cwd is apps/backend
  const uploadsPath = path.join(process.cwd(), "uploads");
  app.useStaticAssets(uploadsPath, {
    prefix: "/uploads",
  });

  app.setGlobalPrefix("api");

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Backend running on http://localhost:${port}`);
  console.log(`📊 API endpoint: http://localhost:${port}/api`);
}

bootstrap();
