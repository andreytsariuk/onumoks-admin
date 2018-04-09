import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Invites {
    static list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/invites`, { params });
    }

    static create(inviteData) {
        return Axios.Api.post(`/v1/admin/invites`, inviteData);
    }
}
