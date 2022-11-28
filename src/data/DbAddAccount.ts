import { AccountModel } from "../domain/entity/account";
import { AddAccount, AddAccountModel } from "../domain/use-case/add-account";
import { Encrypt } from "./helpers/encrypter/encrypt";
import { AddUserRepo } from "./protocols/addUserRepo";
import { ConflictEmailError } from "../errors";

export default class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypt;
  private readonly addUserRepo: AddUserRepo

  constructor(addUserRepo: AddUserRepo, encrypter: Encrypt) {
    this.addUserRepo = addUserRepo
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    
    const { name, email, password  } = account;
    const isUser = await this.addUserRepo.findByEmail(email);

    if(isUser) throw new ConflictEmailError(email);

    const hash = await this.encrypter.encrypt(password)

    const newAccount = await this.addUserRepo.create({ name, email, password: hash });
    return newAccount;
  }
}
