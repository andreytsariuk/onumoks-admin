import { LocalStorageService } from "./localStorage.service";

export const AuthService = class {
  static setLogin(loginData) {
    LocalStorageService.set("access_token", loginData.access_token);
    LocalStorageService.set("roles", loginData.roles);
    LocalStorageService.set("workspace", loginData.workspace);
    LocalStorageService.set("user", loginData.user);
    return loginData;
  }

  static logOut() {
    LocalStorageService.remove("access_token");
    LocalStorageService.remove("roles");
    LocalStorageService.remove("workspace");
    LocalStorageService.remove("user");
  }

  static getToken() {
    return LocalStorageService.get('access_token');
  }


  static checkLogin() {
    let token = AuthService.getToken();
    if (token)
      return true
    else
      return false;
  }
};
