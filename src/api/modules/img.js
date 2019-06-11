export default class {
  constructor(proxy) {
    this.proxy = proxy;
  }

  upload(file, name) {
    return this.proxy.upload("/upload_file", file, name);
  }
}
