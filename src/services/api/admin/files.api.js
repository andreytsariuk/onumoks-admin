import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Files {

    constructor() {
        this.searchTimeout;
        this.timeout = 700;
    }

    list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/files`, { params });
    }

    uploadFile(file_type, formData) {
        return Axios.Api.post(`/v1/admin/files/${file_type}`, formData);
    }
    delete(FileId) {
        return Axios.Api.delete(`/v1/admin/files/${FileId}`);
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
