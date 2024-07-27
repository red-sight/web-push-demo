import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500; // Default status code

    const errorResponse = exception.getError();

    if (typeof errorResponse === 'object' && 'statusCode' in errorResponse) {
      statusCode = errorResponse.statusCode as number;
    }

    let message =
      typeof errorResponse === 'object' && 'message' in errorResponse
        ? errorResponse.message
        : errorResponse;

    try {
      if (typeof message === 'string') message = JSON.parse(message);
    } catch (e) {
      console.error('Failed to parse RPC error message', e);
    }

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
