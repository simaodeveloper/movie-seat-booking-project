export default class Storage {
  constructor(adapter) {
    this.adapter = adapter;
  }

  get(key) {
    return this.adapter.get(key);
  }

  set(key, value) {
    this.adapter.set(key, value);
  }

  delete(key) {
    this.adapter.remove(key);
  }
}
