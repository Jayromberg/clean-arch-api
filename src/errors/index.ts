class BaseError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export class MissingParamError extends BaseError {
  constructor (paramName: string) {
    super(400, `Missing param: ${paramName}`)
  }
}

export class ConflictEmailError extends BaseError { 
  constructor (email: string) {
    super(409, `O email ${email} já está cadastrado`)
  }
}
