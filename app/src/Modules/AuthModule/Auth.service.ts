import { authRepo } from "./Auth.repo";
import { SHA512 } from "crypto-js";
import { TOKEN_LS_NAME } from "../../Constants/Constants";

class AuthService {
  async login(data: any) {
    try {
      data.password = SHA512(data.password).toString();
      const res = await authRepo.login(data);
      // stari nacin
      // localStorage.setItem(TOKEN_LS_NAME, JSON.stringify(res.data.user));
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  register(data: any) {
    console.log(data)
    data.password = SHA512(data.password).toString();
    return authRepo.register(data);
  }

  // TODO :: da li ovo treba
  // fetchActiveAccount() {
  //   return authRepo.fetchActiveAccount();
  // }

  logout() {
    return authRepo.logout();
  }

  isLogged() {
    // return JSON.parse(localStorage.getItem(TOKEN_LS_NAME) as string);
    let x = localStorage.getItem(TOKEN_LS_NAME) as string
    var base64Url = x.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}

export const authService = new AuthService();
