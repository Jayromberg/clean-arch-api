import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { Validation } from "../helpers/validators/validation";
import { badRequest, created } from "../helpers/http-helpers";
import { AddAccount } from "../../domain/use-case/add-account";

export default class SignUpController implements Controller {
  private readonly validation: Validation;
  private readonly addAccount: AddAccount

  constructor(addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation;
  } 

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) return badRequest(error);
    try {   
      const { name, email, password } = httpRequest.body
      const response = await this.addAccount.add({ name, email, password })
      return created(response)
    } catch (error) {
      return badRequest(error);
    }
  }
}
