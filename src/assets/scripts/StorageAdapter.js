export default class StorageAdapter {
  constructor(db) {
    this.db = db;
  }

  get(key) {
    return JSON.parse(this.db.getItem(key));
  }

  set(key, value) {
    this.db.setItem(key, JSON.stringify(value));
  }

  delete(key) {
    this.db.removeItem(key);
  }
}
