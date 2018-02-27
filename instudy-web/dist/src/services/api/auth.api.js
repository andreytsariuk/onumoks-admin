import Config from "../../config";
import { Axios } from "../";
import { AuthService } from '../auth.service'
export class Auth {
  static initializeWorkspace(workspace) {
    return Axios.Server.get(`/auth/v1/workspace/${workspace}`);
  }

  static signIn(signInData) {
    return Axios.Server.post(`/auth/v1/user`, signInData).then(AuthService.setLogin);
  }
}
