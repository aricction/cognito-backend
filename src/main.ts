import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for local dev + Vercel frontend
  app.enableCors({
    origin: [
      'http://localhost:3000', // local dev
      'https://congnito-frontend.vercel.app', // Vercel frontend
    ],
    credentials: true, // needed if using cookies or auth headers
  });

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0'); // '0.0.0.0' required for Render
  console.log(`Server running on port ${port}`);
}
bootstrap();
