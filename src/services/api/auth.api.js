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
  static signUp(signInData, workspace_name, invite_token) {
    return Axios.Server.post(`/auth/v1/sign-up/${workspace_name}/invite/${invite_token}`, signInData).then(AuthService.setLogin);
  }
}
