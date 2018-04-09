import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Users {
    static list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/users`, { params });
    }

    static get(userId) {
        return Axios.Api.get(`/v1/admin/users/${userId}`);
    }

    static update(userId, profile) {
        return Axios.Api
            .put(`/v1/admin/users/${userId}/profile`, profile);
    }

    static uploadAvatar(userId, formData) {
        return Axios.Api
            .post(`/v1/admin/users/${userId}/profile/avatar`, formData)
    }
}
