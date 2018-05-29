import Config from "../../../config";
import { Axios } from "../../";
import { AuthService } from '../../auth.service';

export class LoadItems {

    constructor() { }
    list(load_id) {
        return Axios.Api.get(`/v1/admin/load/${load_id}/load-items`);
    }
    create(load_id, newLoadItem) {
        return Axios.Api.post(`/v1/admin/load/${load_id}/load-items`, newLoadItem);
    }
    delete(load_id, LoadItemId) {
        return Axios.Api.delete(`/v1/admin/load/${load_id}/load-items`);
    }
    get(load_id, LoadItemId) {
        return Axios.Api.get(`/v1/admin/load/${load_id}/load-items`);
    }
    update(load_id, LoadItem) {
        return Axios.Api.put(`/v1/admin/load/${load_id}/load-items`, LoadItem);
    }
}
