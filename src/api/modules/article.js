export default class {
  constructor(proxy) {
    this.proxy = proxy;
  }

  newArticle(uid, token, data) {
    const query = {
      uid: uid,
      title: data.title,
      type_1: data.type[0],
      type_2: data.type[1] | null,
      cover: data.cover,
      content: data.content,
      article_abstract: data.article_abstract,
      hidden: 0
    };

    return this.proxy.loggedQuery("/article/write", token, uid, query);
  }

  updateArticle(uid, token, data) {
    const query = {
      uid: uid,
      title: data.title,
      article_id: data.article_id,
      type_1: data.type[0],
      type_2: data.type[1] | null,
      cover: data.cover,
      content: data.content,
      article_abstract: data.article_abstract
    };

    return this.proxy.loggedQuery("/article/update", token, uid, query);
  }

  deleteArticle(uid, token, data) {
    const query = {
      uid: uid,
      article_id: data.article_id
    };

    return this.proxy.loggedQuery("/article/delete", token, uid, query);
  }

  fetchDetail(article_id) {
    return this.proxy.query("/article/query_by_id", { article_id: article_id });
  }

  fetchListByAuthor(author_id, start, end) {
    const query = {
      author_id: author_id,
      start: start,
      end: end
    };
    return this.proxy.query("/article/query_by_author", query);
  }

  fetchListByTag(tag_id, start, end) {
    const query = {
      type_1: tag_id,
      start: start,
      end: end
    };
    console.log(query);
    return this.proxy.query("/article/query_by_type", query);
  }

  searchTitle(title, start, end) {
    const query = {
      title: title,
      start: start,
      end: end
    };
    return this.proxy.query("/article/query_by_title", query);
  }

  randomArticle() {
    return this.proxy.query("/article/query_random");
  }

  recommendList() {
    return this.proxy.query("/article/recommend");
  }
}
