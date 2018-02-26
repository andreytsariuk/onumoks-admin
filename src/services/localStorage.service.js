import localStorage from "localStorage";

export const LocalStorageService = class {
  static set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    return localStorage.getItem(key);
  }

  static getJSON(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static remove(key) {
    return localStorage.removeItem(key, 0);
  }
};
