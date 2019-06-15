import QueryProxy from "./query";
import Img from "./modules/img";
import User from "./modules/user";
import Article from "./modules/article";
import Comment from "./modules/comment";
import Tag from "./modules/tag";
import Follow from "./modules/follow";
import Like from "./modules/like";
import Report from "./modules/report";
import Admin from "./modules/admin";

export default class {
  constructor(options) {
    this.baseURL = options.baseURL;
    this.modules = new Map();
    this.proxy = new QueryProxy(this.baseURL);

    this._img = new Img(this.proxy);
    this._user = new User(this.proxy);
    this._article = new Article(this.proxy);
    this._comment = new Comment(this.proxy);
    this._tag = new Tag(this.proxy);
    this._follow = new Follow(this.proxy);
    this._like = new Like(this.proxy);
    this._report = new Report(this.proxy);
    this._admin = new Admin(this.proxy);
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

  get comment() {
    return this._comment;
  }

  get tag() {
    return this._tag;
  }

  get follow() {
    return this._follow;
  }

  get like() {
    return this._like;
  }

  get report() {
    return this._report;
  }

  get admin() {
    return this._admin;
  }
}
