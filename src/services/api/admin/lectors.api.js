import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Lectors {
    static list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/lectors`, { params });
    }

    static createNew(newStudent) {
        console.log('createNew')
        return Axios.Api.post(`/v1/admin/lectors/new`, newStudent);

    }
    static createExist(newStudent) {
        return Axios.Api.post(`/v1/admin/lectors/exist`, newStudent);
    }

}
