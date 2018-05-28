import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Threads {
    static list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/threads`, { params });
    }

    static create(newThread) {
        return Axios.Api.post(`/v1/admin/threads`, newThread);
    }
    static delete(ThreadId) {
        return Axios.Api.delete(`/v1/admin/threads/${ThreadId}`);

    }
    static get(ThreadId) {
        return Axios.Api.get(`/v1/admin/threads/${ThreadId}`);
    }
    static update(Thread) {
        return Axios.Api.put(`/v1/admin/threads/${Thread.id}`, Thread);
    }
    static multiDelete(ThreadIds) {
        return Axios.Api.delete(`/v1/admin/threads`, { params: { ThreadIds } });

    }
}
