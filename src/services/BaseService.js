import HttpService from "./HttpService";

export default class BaseService {
  primaryKeyField = "id";
  blockedMethodMessage = this.blockedMethodMessage
  blockedMethods = [];

  constructor(baseUrl, primaryKeyField = "id") {
    this.baseUrl = baseUrl;
    this.primaryKeyField = primaryKeyField;
  }

  async get(id) {
    if (this.blockedMethods.includes("get")) throw new Error(this.blockedMethodMessage);
    return HttpService.get(`${this.baseUrl}/${id}`);
  }

  async getAll(params = {}) {
    if (this.blockedMethods.includes("getAll"))
      throw new Error(this.blockedMethodMessage);

    return HttpService.get(`${this.baseUrl}`, { params });
  }

  async create(payload) {
    if (this.blockedMethods.includes("create"))
      throw new Error(this.blockedMethodMessage);

    return HttpService.post(`${this.baseUrl}`, payload);
  }

  async update(payload) {
    if (this.blockedMethods.includes("update"))
      throw new Error(this.blockedMethodMessage);

    const id = payload[this.primaryKeyField];
    if (!id) throw new Error("ID not found");

    return HttpService.put(`${this.baseUrl}/${id}`, payload);
  }

  async delete(id) {
    if (this.blockedMethods.includes("delete"))
      throw new Error(this.blockedMethodMessage);

    return HttpService.delete(`${this.baseUrl}/${id}`);
  }
}
