import { api } from "../../Api/Api";
const ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FETCH_ACCOUNT: "/user/session",
  LOGOUT: "/auth/logout",
};

class AuthRepo {
  login(data: any) {
    return api.post(ROUTES.LOGIN, data);
  }

  register(data: any) {
    return api.post(ROUTES.REGISTER, data);
  }

  // fetchActiveAccount() {
  //   return api.get(ROUTES.FETCH_ACCOUNT);
  // }

  logout() {
    return api.post(ROUTES.LOGOUT);
  }
}

export const authRepo = new AuthRepo();
