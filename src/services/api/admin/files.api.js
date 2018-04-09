import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Files {
    static list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/files`, { params });
    }

}
