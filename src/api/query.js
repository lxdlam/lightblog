import axios from "axios";
import { ERROR_CODE } from "./error_code";
import { isUndefined } from "util";
import { genKey } from "./util";

export class QueryError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.msg = message;
  }
}

const config = {
  method: "post", // due to the implementation of backend
  transformResponse: [
    function(data) {
      // console.log(data);
      if (Object.keys(data).length === 0) return data;
      // check response format
      if (!isUndefined(data.status) && data.status >= 300)
        throw new QueryError(data.status, data.message);
      if (
        isUndefined(data.code) ||
        isUndefined(data.msg) ||
        isUndefined(data.data) ||
        isUndefined(data.response_time)
      ) {
        throw new QueryError(-1, "Not valid response format");
      }
      if (data.code !== 0) {
        throw new QueryError(data.code, ERROR_CODE.get(data.code));
      } else return data;
    }
  ],
  timeout: 2000, // wait 2s
  responseType: "json", // always json
  responseEncoding: "utf8", // always utf8
  validStatus: status => status >= 200 && status < 300
};

function getTime() {
  return new Date().getTime();
}

export default class {
  constructor(baseURL) {
    this.instance = axios.create(
      Object.assign({}, config, { baseURL: baseURL })
    );
  }

  // returns an promise
  query(url, data) {
    const query = Object.assign(
      {},
      { url: url, data: { request_time: getTime(), ...data } }
    );
    // console.log(query);
    return this.instance(query).then(resp => resp.data);
  }

  loggedQuery(url, token, uid, data) {
    const time = getTime();
    const query = Object.assign(
      {},
      {
        url: url,
        data: { request_time: time, key: genKey(token, uid, time), ...data }
      }
    );
    console.log(query);
    return this.instance(query).then(resp => resp.data);
  }

  // also returns an promise
  upload(url, blob, fileName) {
    let form = new FormData();
    form.append("image", blob, fileName);
    form.append("time", getTime());
    return this.instance(
      Object.assign(
        {},
        {
          url: url,
          data: form,
          headers: {
            "Content-Type": "multipart/form-data"
          },
          timeout: 0
        }
      )
    ).then(resp => resp.data);
  }
}
