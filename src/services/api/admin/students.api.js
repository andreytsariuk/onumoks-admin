import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Students {

    constructor() {

        this.searchTimeout;
        this.timeout = 7000;

    }

    list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/students`, { params });
    }

    createNew(newStudent) {
        return Axios.Api.post(`/v1/admin/students/new`, newStudent);

    }
    createExist(newStudent) {
        return Axios.Api.post(`/v1/admin/students/exist`, newStudent);
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
