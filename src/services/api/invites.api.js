import Config from "../../config";
import { Axios } from "../";
import { AuthService } from '../auth.service'
export class Invites {

    static get(params) {
        return Axios.Server.get(`public/v1/invites`, {
            params
        });
    }
}
