export default class {
  constructor(proxy) {
    this.proxy = proxy;
  }

  testLike(uid, token, article_id) {
    return this.proxy.loggedQuery("/thumb/query_if_thumb", token, uid, {
      uid: uid,
      article_id: article_id
    });
  }

  queryLikes(article_id) {
    return this.proxy.query("/thumb/query_thumb_number", {
      article_id
    });
  }

  makeLike(uid, token, article_id) {
    return this.proxy.loggedQuery("/thumb/add", token, uid, {
      uid,
      article_id
    });
  }

  cancelLike(uid, token, article_id) {
    return this.proxy.loggedQuery("/thumb/delete", token, uid, {
      uid,
      article_id
    });
  }
}
