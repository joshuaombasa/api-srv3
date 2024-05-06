import { CustomError } from './custom-error';

class NotFoundError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}

export { NotFoundError };
