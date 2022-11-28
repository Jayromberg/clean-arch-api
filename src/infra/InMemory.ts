import { DataBase, DataBaseId } from './protocols/InMemoryDb';

export default class InMemory<T extends DataBaseId> implements DataBase<T> {
  private db: Array<T> = []
  private static id: number = 0;

  set(value: T): T {
    this.db.push(value);
    return value;
  }

  get(id: number): T {
    const [data] = this.db.filter((data) => data.id === id);
    return data;
  }

  getAll(): [] | T[] {
    return this.db;
  }
}
