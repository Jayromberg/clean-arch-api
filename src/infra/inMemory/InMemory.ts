import { DataBase, columnDb } from './IMemoryDb';

export default class InMemory<T extends columnDb> implements DataBase<T> {
  private db: Array<T> = []
  private static id: number = 0;

  set(value: T): T {
    const id = InMemory.id =+ 1;
    this.db.push({ id, ...value });
    return this.get(id);
  }

  get(id: number): T {
    const [data] = this.db.filter((data) => data.id === id);
    return data;
  }

  getByEmail(email: string): T {
    const [data] = this.db.filter((data) => data.email === email);
    return data;
  }

  getAll(): [] | T[] {
    return this.db;
  }
}
