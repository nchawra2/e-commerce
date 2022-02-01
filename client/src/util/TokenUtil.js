import axios from "axios";

export class TokenUtil {
  static setToken(token) {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  }
}
