import { Controller } from "@/presentation/protocols/Controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";
import { Validation } from "@/presentation/helpers/validators/validation";
import { badRequest, created } from "@/presentation/helpers/http-helpers";
import { AddAccount } from "@/domain/use-case/add-account";

export default class SignUpController implements Controller {
  private readonly validation: Validation;
  private readonly addAccount: AddAccount

  constructor(addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation;
  } 

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) badRequest(error);

    const { name, email, password } = httpRequest.body

    const newAccount = await this.addAccount.add({ name, email, password })
    return created(newAccount)
  }
}