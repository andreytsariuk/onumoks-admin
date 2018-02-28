import Config from "../../config";
import { Axios } from "../";
import { AuthService } from '../auth.service'
export class Users {
    static list(params) {
        return Axios.Api.get(`/v1/users`, { params });
    }

    static get(userId) {
        return Axios.Api.get(`/v1/users/${userId}`);
    }
}
