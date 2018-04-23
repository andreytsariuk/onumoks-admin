import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Courses {
    static list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/courses`, { params });
    }

    static create(newCourse) {
        return Axios.Api.post(`/v1/admin/courses`, newCourse);

    }

}
