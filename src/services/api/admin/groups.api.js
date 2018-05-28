import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Groups {
    static list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/groups`, { params });
    }

    static create(newGroup) {
        return Axios.Api.post(`/v1/admin/groups`, newGroup);
    }
    static delete(GroupId) {
        return Axios.Api.delete(`/v1/admin/groups/${GroupId}`);

    }
    static get(GroupId) {
        return Axios.Api.get(`/v1/admin/groups/${GroupId}`);
    }
    static update(Group) {
        return Axios.Api.put(`/v1/admin/groups/${Group.id}`, Group);
    }
    static multiDelete(GroupIds) {
        return Axios.Api.delete(`/v1/admin/groups`, { params: { GroupIds } });

    }
}
