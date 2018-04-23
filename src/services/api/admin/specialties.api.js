import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Specialties {
    static list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/specialties`, { params });
    }

    static create(newSpecialty) {
        return Axios.Api.post(`/v1/admin/specialties`, newSpecialty);

    }

}
