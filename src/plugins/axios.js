import Vue from "vue";
import axios from "axios";

// Register axios to Vue prototype chain
// So we can use this.axios to use call axios
Vue.prototype.axios = axios;
