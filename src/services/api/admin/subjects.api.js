import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class Subjects {
    static list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/subjects`, { params });
    }

    static create(newSubject) {
        return Axios.Api.post(`/v1/admin/subjects`, newSubject);
    }
    static delete(subjectId) {
        return Axios.Api.delete(`/v1/admin/subjects/${subjectId}`);

    }
    static get(subjectId) {
        return Axios.Api.get(`/v1/admin/subjects/${subjectId}`);
    }
    static update(subject) {
        return Axios.Api.put(`/v1/admin/subjects/${subject.id}`, subject);
    }
    static multiDelete(SubjectIds) {
        return Axios.Api.delete(`/v1/admin/subjects`, { params: { SubjectIds } });

    }
}
