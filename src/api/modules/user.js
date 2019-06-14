export default class {
  constructor(proxy) {
    this.proxy = proxy;
  }

  testAccount(account) {
    return this.proxy.query("/login_validate_account", { account: account });
  }

  testEmail(email) {
    return this.proxy.query("/login_validate_email", { email: email });
  }

  testPhone(phone) {
    return this.proxy.query("/login_validate_phone", { phone: phone });
  }

  register(data) {
    const query_object = {
      account: data.account,
      pwd: data.pwd,
      username: data.username,
      email: data.email,
      phone: data.phone,
      interest: data.interest,
      avatar_lg: data.avatar_lg,
      avatar_md: data.avatar_md,
      avatar_sm: data.avatar_sm
    };

    return this.proxy.query("/register", query_object);
  }

  login(credential, passwd) {
    return this.proxy.query("/login", {
      loginInfo: credential,
      pwd: passwd
    });
  }

  logout(uid, token) {
    return this.proxy.loggedQuery("/logout", token, uid, { uid: uid });
  }

  renew(uid, token) {
    return this.proxy.loggedQuery("/token_renew", token, uid, {
      uid: uid,
      token: token
    });
  }

  updateUserInfo(uid, token, data) {
    return this.proxy.loggedQuery("/user/update", token, uid, {
      uid: data.uid,
      account: data.account,
      nickname: data.nickname,
      email: data.email,
      phone: data.phone,
      avatar_sm: data.avatar_sm,
      avatar_md: data.avatar_md,
      avatar_lg: data.avatar_lg,
      singature: data.singature,
      interest: data.interest
    });
  }

  fetchAvatar(uid) {
    return this.proxy.query("/user/avatar", { uid });
  }

  fetchDetail(uid, token) {
    return this.proxy.loggedQuery("/user/query_by_id", token, uid, { uid });
  }
}
