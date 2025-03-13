import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

async function getApp(): Promise<INestApplication> {
  if (app) {
    return app;
  }

  app = await NestFactory.create(AppModule, {
    logger: false,
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
    bufferLogs: false
  });

  await app.init();
  return app;
}

export default async function handler(req: any, res: any) {
  try {
    // Inicializa o app com timeout de 10 segundos
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout initializing app')), 10000);
    });

    const app = await Promise.race([getApp(), timeoutPromise]);
    const server = (app as INestApplication).getHttpAdapter().getInstance();
    await server(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message
    });
  }
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  getApp();
} 