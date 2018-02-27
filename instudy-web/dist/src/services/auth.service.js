import { LocalStorageService } from "./localStorage.service";

export const AuthService = class {
  static setLogin(loginData) {
    LocalStorageService.set("access_token", loginData.token);
    LocalStorageService.set("expires_at", loginData.expires_at);
    LocalStorageService.set("workspace", loginData.workspace);
    LocalStorageService.set("user", loginData.user);
    return loginData;
  }

  static logOut() {
    LocalStorageService.remove("access_token");
    LocalStorageService.remove("expires_at");
    LocalStorageService.remove("workspace");
    LocalStorageService.remove("user");
  }
};
