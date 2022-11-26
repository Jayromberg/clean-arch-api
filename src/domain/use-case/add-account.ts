import { AccountModel } from '../entity/account';

export interface AddAccountModel extends Omit<AccountModel, 'id'> {}

export interface AddAccount {
  add (account: AddAccountModel): Promise<AccountModel>
}
