export class AuthUtil {
  static isLoggedIn() {
    let token = sessionStorage.getItem(process.env.REACT_APP_SECRET_KEY);
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  static getToken() {
    return sessionStorage.getItem(process.env.REACT_APP_SECRET_KEY);
  }
}
