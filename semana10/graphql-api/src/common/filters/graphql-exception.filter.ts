import { Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

const STATUS_TO_CODE: Record<number, string> = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHENTICATED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
};

@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const response = exception.getResponse();
    const message =
      typeof response === 'string'
        ? response
        : ((response as { message?: string | string[] }).message ??
          exception.message);

    return new GraphQLError(
      Array.isArray(message) ? message.join(', ') : message,
      {
        extensions: {
          code: STATUS_TO_CODE[status] ?? 'INTERNAL_SERVER_ERROR',
          status,
        },
      },
    );
  }
}
