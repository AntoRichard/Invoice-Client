import { PlatformApi } from "../utils/api";

export default class User {
  static SignupService(data, start, callback, error, next) {
    start();
    return PlatformApi.post("/signup", data)
      .then(callback)
      .catch(error)
      .finally(next);
  }

  static SigninService(data, start, callback, error, next) {
    start();
    return PlatformApi.post("/signin", data)
      .then(callback)
      .catch(error)
      .finally(next);
  }

  static getUserService(start, callback, error, next) {
    start();
    return PlatformApi.get("/user").then(callback).catch(error).finally(next);
  }

  static getAllUsersService(start, callback, error, next) {
    start();
    return PlatformApi.get("/users").then(callback).catch(error).finally(next);
  }

  static deleteUserService(id, start, callback, error, next) {
    start();
    return PlatformApi.get(`user/${id}`).then(callback).catch(error).finally(next);
  }
}
