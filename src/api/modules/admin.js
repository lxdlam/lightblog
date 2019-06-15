export default class {
  constructor(proxy) {
    this.proxy = proxy;
  }

  fetchUsersList(uid, token, start, end) {
    return this.proxy.loggedQuery("/user/admin/query_all", token, uid, {
      uid,
      start,
      end,
      ban: 2
    });
  }

  fetchBannedUsersList(uid, token, start, end) {
    return this.proxy.loggedQuery("/user/admin/query_all", token, uid, {
      uid,
      start,
      end,
      ban: 1
    });
  }

  banUser(uid, token, tid) {
    return this.proxy.loggedQuery("/user/admin/ban_user", token, uid, {
      ban_uid: tid
    });
  }

  hideComment(uid, token, cid) {
    return this.proxy.loggedQuery("/comment/admin/hide", token, uid, {
      comment_id: cid
    });
  }

  addTag(uid, token, name, desc) {
    return this.proxy.loggedQuery("/label/admin/insert", token, uid, {
      uid,
      label_name: name,
      description: desc
    });
  }

  updateTag(uid, token, tid, name, desc) {
    return this.proxy.loggedQuery("/label/admin/update", token, uid, {
      uid,
      label_id: tid,
      label_name: name,
      description: desc
    });
  }

  fetchReportList(uid, token, start, end) {
    return this.proxy.loggedQuery("/report/admin/query_all", token, uid, {
      uid,
      start,
      end
    });
  }

  handleReport(uid, token, aid, ret) {
    return this.proxy.loggedQuery("/report/admin/handle", token, uid, {
      uid,
      article_id: aid,
      handle_result: ret === true ? 1 : 2
    });
  }
}
