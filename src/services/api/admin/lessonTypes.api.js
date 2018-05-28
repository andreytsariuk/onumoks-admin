import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service'
export class LessonTypes {
    static list(params = { page: 1, rowsPerPage: 10 }) {
        return Axios.Api.get(`/v1/admin/lesson-types`, { params });
    }

    static create(newLessonType) {
        return Axios.Api.post(`/v1/admin/lesson-types`, newLessonType);
    }
    static delete(lessonTypeId) {
        return Axios.Api.delete(`/v1/admin/lesson-types/${lessonTypeId}`);

    }
    static get(lessonTypeId) {
        return Axios.Api.get(`/v1/admin/lesson-types/${lessonTypeId}`);
    }
    static update(lessonType) {
        return Axios.Api.put(`/v1/admin/lesson-types/${lessonType.id}`, lessonType);
    }
    static multiDelete(LessonTypeIds) {
        return Axios.Api.delete(`/v1/admin/lesson-types`, { params: { LessonTypeIds } });

    }
}
