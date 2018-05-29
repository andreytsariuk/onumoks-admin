import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Groups {
    constructor() {

        this.searchTimeout;
        this.timeout = 700;

    }

    list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/groups`, { params });
    }

    create(newGroup) {
        return Axios.Api.post(`/v1/admin/groups`, newGroup);
    }
    delete(GroupId) {
        return Axios.Api.delete(`/v1/admin/groups/${GroupId}`);
    }
    get(GroupId) {
        return Axios.Api.get(`/v1/admin/groups/${GroupId}`);
    }
    update(Group) {
        return Axios.Api.put(`/v1/admin/groups/${Group.id}`, Group);
    }
    multiDelete(GroupIds) {
        return Axios.Api.delete(`/v1/admin/groups`, { params: { GroupIds } });

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
