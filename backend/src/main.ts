import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

let app: any;

async function bootstrap() {
  if (app) {
    return app;
  }

  const logger = new Logger('Bootstrap');
  app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
    cors: true
  });
  
  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',  // Frontend local development
      'http://localhost:3001',
      'http://localhost:5173',
      process.env.FRONTEND_URL || '*'  // Production frontend URL
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });

  // Get port from environment variable or use default
  const port = process.env.PORT || 3000;
  
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(port);
    logger.log(`Application is running on: ${await app.getUrl()}`);
  } else {
    await app.init();
  }

  return app;
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

// For Vercel serverless deployment
export default bootstrap;
