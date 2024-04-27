export type ServiceMessage = { message: string };

type StatusTypes =
'BAD_REQUEST' |
'NOT_FOUND' |
'UNAUTHORIZED' |
'CONFLICT' |
'UNPROCESSABLE_ENTITY' |
'SUCCESSFUL' |
'CREATED' |
'NO_CONTENT' |
'FORBIDDEN' |
'INTERNAL_SERVER_ERROR';

export type ServiceResponses<T> = {
  status: StatusTypes,
  data: ServiceMessage | T | string,
};
