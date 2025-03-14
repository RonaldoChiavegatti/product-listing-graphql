import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: '*',  // Update to allow all origins in production
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });

  const port = parseInt(process.env.PORT || '3000', 10);
  console.log(`Environment variables:`, {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
  });
  
  try {
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running at http://0.0.0.0:${port}`);
    console.log(`GraphQL endpoint: http://0.0.0.0:${port}/graphql`);
    console.log(`Health check endpoint: http://0.0.0.0:${port}/health`);
  } catch (error) {
    console.error('Failed to start server:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errno: error.errno
    });
    process.exit(1);
  }
}
bootstrap();
