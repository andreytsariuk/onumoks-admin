import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service';

export class Keywords {

    constructor() {
        this.searchTimeout;
        this.timeout = 700;
    }

    list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/keywords`, { params });
    }

    update(id, newKeyword) {
        return Axios.Api.put(`/v1/admin/keywords/${id}`, newKeyword);

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
