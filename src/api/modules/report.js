export default class {
  constructor(proxy) {
    this.proxy = proxy;
  }

  makeReport(uid, token, aid, reason) {
    return this.proxy.loggedQuery("/report/article", token, uid, {
      uid,
      article_id: aid,
      reason
    });
  }
}
