import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Load {
    constructor() {

        this.searchTimeout;
        this.timeout = 700;

    }

    list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/load`, { params });
    }

    create(newLoad) {
        return Axios.Api.post(`/v1/admin/load`, newLoad);
    }
    delete(LoadId) {
        return Axios.Api.delete(`/v1/admin/load/${LoadId}`);
    }
    get(LoadId) {
        return Axios.Api.get(`/v1/admin/load/${LoadId}`);
    }
    update(Load) {
        return Axios.Api.put(`/v1/admin/load/${Load.id}`, Load);
    }
    multiDelete(LoadIds) {
        return Axios.Api.delete(`/v1/admin/load`, { params: { LoadIds } });

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
