export interface DataBaseId {
  id: number;
}

export interface DataBase<T> {
  set(value: T): T;
  get(id: number): T | undefined;
  getAll(): Array<T> | [];
}