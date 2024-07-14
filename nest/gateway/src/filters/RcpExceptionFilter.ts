import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    console.log('In RpcExceptionFilter');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500; // Default status code

    const errorResponse = exception.getError();

    if (typeof errorResponse === 'object' && 'statusCode' in errorResponse) {
      statusCode = errorResponse.statusCode as number;
    }

    const message =
      typeof errorResponse === 'object' && 'message' in errorResponse
        ? errorResponse.message
        : errorResponse;

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
