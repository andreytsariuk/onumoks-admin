import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Users {

    constructor() {

        this.searchTimeout;
        this.timeout = 700;

    }

    list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/users`, { params });
    }

    get(userId) {
        return Axios.Api.get(`/v1/admin/users/${userId}`);
    }

    update(userId, profile) {
        return Axios.Api
            .put(`/v1/admin/users/${userId}/profile`, profile);
    }

    uploadAvatar(userId, formData) {
        return Axios.Api
            .post(`/v1/admin/users/${userId}/profile/avatar`, formData)
    }

    search(params = { page: 1, rowsPerPage: 10 }) {
        console.log('this.searchTimeout')
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        return new Promise((resolve, reject) => {
            this.searchTimeout = setTimeout(() => this.list(params).then(resolve).catch(reject), this.timeout);
        })
    }
}
