export default class {
  constructor(proxy) {
    this.proxy = proxy;
  }

  testFollow(uid, token, tid) {
    return this.proxy.loggedQuery("/concern/is_concerned", token, uid, {
      uid: uid,
      target_id: tid
    });
  }

  makeFollow(uid, token, tid) {
    return this.proxy.loggedQuery("/concern/add", token, uid, {
      uid: uid,
      target_id: tid
    });
  }

  cancelFollow(uid, token, tid) {
    return this.proxy.loggedQuery("/concern/delete", token, uid, {
      uid: uid,
      target_id: tid
    });
  }

  fetchFollowerList(uid, token, start, end) {
    return this.proxy.loggedQuery(
      "/concern/query_concern_follower",
      token,
      uid,
      {
        uid: uid,
        start: start,
        end: end
      }
    );
  }

  fetchFollowedList(uid, token, start, end) {
    return this.proxy.loggedQuery("/concern/query_concern_target", token, uid, {
      uid: uid,
      start: start,
      end: end
    });
  }
}
