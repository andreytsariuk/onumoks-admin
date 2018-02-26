import axios from "axios";
import Middlewares from "../middleware";
import cookie from "js-cookie";
import { ErrorsService } from "./errors.service";

export default class AxiosApiService {
  constructor(url) {
    this.url = url;

    let token = this.access_token;
    if (token && token !== null) {
      this.setToken(token);
    } else {
      this.axios = axios.create({
        baseURL: url,
        timeout: 3000
      });
    }

    this.axios.interceptors.response.use(response => {
      return response;
    }, Middlewares.ParseError);
  }

  setToken(token) {
    cookie.set("token", token);
    this.axios = axios.create({
      baseURL: this.url,
      timeout: 3000,

      headers: {
        "x-access-token": token
      }
    });
  }

  get(...params) {
    return this.axios.get(...params)
      .then(res => res.data)
  }
  post(...params) {
    return this.axios.post(...params)
      .then(res => res.data)
  }
  put(...params) {
    return this.axios.put(...params)
      .then(res => res.data)
  }
  delete(...params) {
    return this.axios.delete(...params)
      .then(res => res.data)
  }

  get access_token() {
    let token = cookie.get("token");
    console.log("token", token);
    return token;
  }
}
