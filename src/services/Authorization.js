import { PlatformApi } from "../utils/api";

export default class Authorization {
  static checkToken(start, callback, error, next) {
    start();
    PlatformApi.get("/interceptor").then(callback).catch(error).finally(next);
  }
}
