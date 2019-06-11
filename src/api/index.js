import API from "./api";

let _Vue = null;
let _instance = null;

export default function install(Vue, options) {
  if (install.installed && _Vue === Vue) return;

  install.installed = true;
  _Vue = Vue;

  // Make it a singleton
  if (_instance === null) {
    _instance = new API(options);

    Object.defineProperty(Vue.prototype, "$api", {
      get() {
        return _instance;
      }
    });
  }
}
