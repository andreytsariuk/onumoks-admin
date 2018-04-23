import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Students {
    static list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/students`, { params });
    }

    static createNew(newStudent) {
        console.log('createNew')
        return Axios.Api.post(`/v1/admin/students/new`, newStudent);

    }
    static createExist(newStudent) {
        return Axios.Api.post(`/v1/admin/students/exist`, newStudent);
    }

}
