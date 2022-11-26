import { Controller } from "@/presentation/protocols/Controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";
import { Validation } from "@/presentation/helpers/validators/validation";
import { badRequest } from "@/presentation/helpers/http-helpers";

export default class SignUpController implements Controller {
  private readonly validation: Validation;

  constructor(validation: Validation) {
    this.validation = validation;
  } 

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) badRequest(error);
  }
}
