import { Controller } from "@/presentation/protocols/Controller";
import { Validation } from "@/presentation/helpers/validators/validation";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

export default class SignUpController implements Controller {
  private readonly validation: Validation;

  constructor(validation: Validation) {
    this.validation = validation;
  } 

  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
}
