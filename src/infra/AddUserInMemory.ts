import { AddUserRepo } from "data/protocols/addUserRepo";
import { AccountModel } from "domain/entity/account";
import { AddAccountModel } from "domain/use-case/add-account";
import InMemory from "./inMemory/InMemory";

export default class AddUserInMemory implements AddUserRepo {
  private _model = new InMemory<AccountModel>()

  async findByEmail(email: string): Promise<AccountModel> {
    const user = this._model.getByEmail(email);
    return user;
  }

  async create(account: AddAccountModel): Promise<AccountModel> {
    const newUser = this._model.set({ id: null, ...account })
    return newUser;
  }
}