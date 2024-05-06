import { CustomError } from './custom-error';

class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string) {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}

export { NotAuthorizedError };
