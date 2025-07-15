import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let type = 'InternalServerError';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseMessage = exception.getResponse();

      if (typeof responseMessage === 'string') {
        message = responseMessage;
      } else if (
        typeof responseMessage === 'object' &&
        responseMessage !== null
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message = (responseMessage as any).message || message;
      }

      type = exception.name;
    }

    this.logger.error(
      `[${request.method}] ${request.url} → ${status} - ${message}`,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: {
        message,
        type,
      },
    });
  }
}
