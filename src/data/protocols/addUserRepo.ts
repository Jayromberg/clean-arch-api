import { AccountModel } from "domain/entity/account"
import { AddAccountModel } from "domain/use-case/add-account"

export interface AddUserRepo {
  findByEmail(email: string): Promise<AccountModel | null>
  create (account: AddAccountModel): Promise<AccountModel>
}
