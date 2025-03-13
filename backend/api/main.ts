import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Logger } from '@nestjs/common';

let cachedApp: any;

async function bootstrap() {
  if (cachedApp) {
    return cachedApp;
  }

  const logger = new Logger('Bootstrap');
  const isProduction = process.env.NODE_ENV === 'production';
  
  try {
    const app = await NestFactory.create(AppModule, {
      logger: isProduction ? false : ['error', 'warn'],
      cors: {
        origin: [
          'http://localhost:3000',
          'http://localhost:3001',
          'http://localhost:5173',
          process.env.FRONTEND_URL || '*'
        ],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
      },
      bufferLogs: !isProduction
    });

    if (!isProduction) {
      const port = process.env.PORT || 3000;
      await app.listen(port);
      logger.log(`Application is running on: ${await app.getUrl()}`);
    } else {
      await app.init();
    }

    cachedApp = app;
    return app;
  } catch (error) {
    if (!isProduction) {
      logger.error('Failed to initialize application:', error);
    }
    throw error;
  }
}

export default async function handler(req: any, res: any) {
  try {
    const app = await bootstrap();
    const server = app.getHttpAdapter().getInstance();
    return server(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
} 