import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Lectors {

    constructor() {
        this.searchTimeout;
        this.timeout = 700;
    }

    list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/lectors`, { params });
    }

    uploadArticle(lectorId, file_type, formData) {
        return Axios.Api.post(`/v1/admin/lectors/${lectorId}/files/${file_type}`, formData);
    }

    createNew(newStudent) {
        console.log('createNew')
        return Axios.Api.post(`/v1/admin/lectors/new`, newStudent);

    }
    createExist(newStudent) {
        return Axios.Api.post(`/v1/admin/lectors/exist`, newStudent);
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
