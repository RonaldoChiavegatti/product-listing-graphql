import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  
  // Set global prefix
  app.setGlobalPrefix('api');
  
  // Enable CORS
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });

  // Use Render's dynamic PORT
  const port = process.env.PORT || 3000;

  try {
    // Start listening on 0.0.0.0 with Render's PORT
    await app.listen(port, '0.0.0.0');
    
    logger.log(`Server is running on port ${port}`);
    logger.log(`Environment: ${process.env.NODE_ENV}`);
    logger.log(`GraphQL endpoint: /graphql`);
    logger.log(`Health check endpoint: /api/health`);

    // Handle shutdown gracefully
    process.on('SIGTERM', async () => {
      logger.log('SIGTERM received, shutting down...');
      await app.close();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    logger.error('Error details:', {
      message: error.message,
      code: error.code,
      errno: error.errno
    });
    process.exit(1);
  }
}

// Add proper error handling for unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

bootstrap();
