import Axios from "axios";

export class ProductTransactionApi {
  get(params?: any) {
    return Axios.get("/api/product-transaction", {
      params,
    });
  }
  getDetail(id: any) {
    return Axios.get("/api/product-transaction/" + id);
  }
  delete(id: any) {
    return Axios.delete("/api/product-transaction/" + id);
  }
}