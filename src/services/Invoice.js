import { PlatformApi } from "../utils/api";

export default class Invoice {
  static getInvoices(start, callback, error, next) {
    start();
    return PlatformApi.get("/invoice")
      .then(callback)
      .catch(error)
      .finally(next);
  }

  static getOneInvoices(id, start, callback, error, next) {
    start();
    return PlatformApi.get(`/invoice/${id}`)
      .then(callback)
      .catch(error)
      .finally(next);
  }

  static postInvoice(data, start, callback, error, next) {
    start();
    return PlatformApi.post("/invoice", data)
      .then(callback)
      .catch(error)
      .finally(next);
  }

  static patchInvoice(data, start, callback, error, next) {
    start();
    return PlatformApi.patch("/invoice", data)
      .then(callback)
      .catch(error)
      .finally(next);
  }
  static deleteInvoice(id, start, callback, error, next) {
    start();
    return PlatformApi.delete(`/invoice/${id}`)
      .then(callback)
      .catch(error)
      .finally(next);
  }

  static sortInvoice(data, start, callback, error, next) {
    start();
    return PlatformApi.get(`/invoices/sort?desc=${data.desc}&asec=${data.aesc}`)
      .then(callback)
      .catch(error)
      .finally(next);
  }

  static filterInvoice(data, start, callback, error, next) {
    start();
    return PlatformApi.get(
      `/invoices/filter?start=${data.start}&end=${data.end}`
    )
      .then(callback)
      .catch(error)
      .finally(next);
  }

  static filterAndSortInvoice(data, start, callback, error, next) {
    start();
    return PlatformApi.get(
      `/invoices?asec=${data.aesc}&desc=${data.desc}&start=${data.start}&end=${data.end}`
    )
      .then(callback)
      .catch(error)
      .finally(next);
  }
}
