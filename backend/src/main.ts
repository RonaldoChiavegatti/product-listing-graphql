import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  
  // Enable CORS
  app.enableCors({
    origin: '*',  // Update to allow all origins in production
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });

  // Get port from environment
  const port = process.env.PORT || 3000;
  logger.log(`Environment variables:`, {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
  });
  
  try {
    // Enable shutdown hooks
    app.enableShutdownHooks();
    
    // Start listening
    await app.listen(port);
    
    const serverUrl = await app.getUrl();
    logger.log(`Server is running on: ${serverUrl}`);
    logger.log(`GraphQL endpoint: ${serverUrl}/graphql`);
    logger.log(`Health check endpoint: ${serverUrl}/health`);
    logger.log(`Environment: ${process.env.NODE_ENV}`);
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
