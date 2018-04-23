import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Positions {
    static list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/positions`, { params });
    }

    static create(newPosition) {
        return Axios.Api.post(`/v1/admin/positions`, newPosition);

    }

}
