export interface columnDb {
  id: number;
  email: string;
}

export interface DataBase<T> {
  set(value: T): T;
  get(id: number): T | undefined;
  getByEmail(email: string): T | null;
  getAll(): Array<T> | [];
}