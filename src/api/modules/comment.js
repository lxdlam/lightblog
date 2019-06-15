export default class {
  constructor(proxy) {
    this.proxy = proxy;
  }

  newComment(uid, token, data) {
    return this.proxy.loggedQuery("/comment/insert", token, uid, {
      uid: data.uid,
      comment: data.comment,
      article_id: data.article_id,
      parent_comment_id: data.parent_comment_id
    });
  }

  fetchCommentByArticle(article_id, start, end) {
    return this.proxy.query("/comment/query_by_article", {
      article_id: article_id,
      start: start,
      end: end
    });
  }

  fetchCommentByUser(uid, start, end) {
    return this.proxy.query("/comment/query_by_user", {
      user_id: uid,
      start: start,
      end: end
    });
  }

  fetchCommentToUser(uid, token) {
    return this.proxy.loggedQuery("/comment/query_for_user", token, uid, {
      uid: uid
    });
  }

  detailComment(id) {
    return this.proxy.query("/comment/query_by_parent", {
      parent_comment_id: id
    });
  }
}
