import { LocalStorageService } from "./localStorage.service";
import _ from 'lodash';


export const AuthService = class {
  static setLogin(loginData) {
    LocalStorageService.set("access_token", loginData.access_token);
    LocalStorageService.set("roles", loginData.user.short_roles);
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
    return LocalStorageService.getJSON('access_token');
  }

  static getRoles() {
    return LocalStorageService.getJSON('roles');
  }

  static Workspace() {
    return LocalStorageService.getJSON('workspace');
  }
  static checkLogin() {
    let token = AuthService.getToken();
    if (token)
      return true
    else
      return false;
  }

  static checkRoles(roles = []) {
    let userRoles = LocalStorageService.getJSON('roles');
    let deny = true;
    _.forEach(roles, role => {
      if (_.indexOf(userRoles, role) === -1)
        deny = false;

    })

    return deny;

  }
};
