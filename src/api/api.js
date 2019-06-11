import QueryProxy from "./query";
import Img from "./modules/img";
import User from "./modules/user";
import Article from "./modules/article";

export default class {
  constructor(options) {
    this.baseURL = options.baseURL;
    this.modules = new Map();
    this.proxy = new QueryProxy(this.baseURL);

    this._img = new Img(this.proxy);
    this._user = new User(this.proxy);
    this._article = new Article(this.proxy);
  }

  get img() {
    return this._img;
  }

  get user() {
    return this._user;
  }

  get article() {
    return this._article;
  }
}
