import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Threads {
    constructor() {
        this.searchTimeout;
        this.timeout = 700;
    }

    list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/threads`, { params });
    }
    create(newThread) {
        return Axios.Api.post(`/v1/admin/threads`, newThread);
    }
    delete(ThreadId) {
        return Axios.Api.delete(`/v1/admin/threads/${ThreadId}`);
    }
    get(ThreadId) {
        return Axios.Api.get(`/v1/admin/threads/${ThreadId}`);
    }
    update(Thread) {
        return Axios.Api.put(`/v1/admin/threads/${Thread.id}`, Thread);
    }
    multiDelete(ThreadIds) {
        return Axios.Api.delete(`/v1/admin/threads`, { params: { ThreadIds } });
    }

    search(params = { page: 1, rowsPerPage: 10 }) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        return new Promise((resolve, reject) => {
            this.searchTimeout = setTimeout(() => this.list(params).then(resolve).catch(reject), this.timeout);
        })
    }
}
