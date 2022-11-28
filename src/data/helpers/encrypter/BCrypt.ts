import bcrypt from "bcrypt";
import { Encrypt } from "./encrypt";

export default class BCrypt implements Encrypt {
  private _bcrypt = bcrypt;

  async encrypt(password: string): Promise<string> {
    const salt = 12;
    const hash = await this._bcrypt.hash(password, salt);
    return hash;
  }
}