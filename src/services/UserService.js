import HttpService from "./HttpService";
import BaseService from "./BaseService";

class UserService extends BaseService {
  auth(payload) {
    return HttpService.post(`${this.baseUrl}/auth`, payload);
  }
}

export default new UserService(`users`);
