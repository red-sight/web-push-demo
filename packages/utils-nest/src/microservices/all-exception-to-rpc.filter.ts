import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";

@Catch()
export class AllExceptionsToRpcFilter implements ExceptionFilter {
  catch(exception: any): Observable<any> {
    let statusCode = 500;
    let message = exception.message || "Unknown error";

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (exceptionResponse) {
        message = exceptionResponse;
        if (
          typeof exceptionResponse === "object" &&
          (exceptionResponse as any)?.message
        ) {
          message = (exceptionResponse as any).message;
        }
      }
    }

    return throwError(
      () =>
        new RpcException({
          statusCode,
          message: JSON.stringify(message)
        })
    );
  }
}
