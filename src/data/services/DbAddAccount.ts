import { AccountModel } from "../../domain/entity/account";
import { AddAccount, AddAccountModel } from "../../domain/use-case/add-account";
import { Encrypt } from "../protocols/encrypt";

export default class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypt;
  private readonly addUserRepo: AddAccount

  constructor(addUserRepo: AddAccount, encrypter: Encrypt) {
    this.addUserRepo = addUserRepo
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    const { name, email, password  } = account;

    const hash = this.encrypter.encrypt(password)

    const newAccount = await this.addUserRepo.add({ name, email, password: hash });
    return newAccount;
  }
}