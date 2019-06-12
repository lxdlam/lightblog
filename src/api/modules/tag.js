export default class {
  constructor(proxy) {
    this.proxy = proxy;
  }

  detail(id) {
    return this.proxy.query("/label/query_by_id", { label_id: id });
  }

  list(start, end) {
    return this.proxy.query("/label/query_all_interests", { start, end });
  }
}
