import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException, UnauthorizedException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException | UnauthorizedException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();
    const status = exception.getStatus();
    const message = exception.message;

    return {
      statusCode: status,
      message: message,
    };
  }
}
