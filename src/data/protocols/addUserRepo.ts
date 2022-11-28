import { AccountModel } from '../../domain/entity/account';

export interface AddAccountModel extends Omit<AccountModel, 'id'> {}

export interface addUserRepo {
  findByEmail(email: string): Promise<AccountModel | null>
  create (account: AddAccountModel): Promise<AccountModel>
}
