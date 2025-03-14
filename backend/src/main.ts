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

  // Fixed port and host for Render deployment
  const port = 10000;
  const host = '0.0.0.0';

  logger.log(`Environment variables:`, {
    PORT: port,
    NODE_ENV: process.env.NODE_ENV,
    HOST: host
  });
  
  try {
    // Enable shutdown hooks
    app.enableShutdownHooks();
    
    // Start listening with explicit port and host
    await app.listen(port, host);
    
    // Use the actual service URL in production
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://product-listing-graphql.onrender.com'
      : `http://${host}:${port}`;

    logger.log(`Server is running on: ${baseUrl}`);
    logger.log(`GraphQL endpoint: ${baseUrl}/graphql`);
    logger.log(`Health check endpoint: ${baseUrl}/api/health`);
    logger.log(`Environment: ${process.env.NODE_ENV}`);
    logger.log(`Listening on port ${port} and host ${host}`);

    // Log when the application is ready
    process.send?.('ready');

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
