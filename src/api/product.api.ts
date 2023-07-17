import Axios from "axios";

export class ProductApi {
  get(params?: any) {
    return Axios.get("/api/product", {
      params,
    });
  }
  getDetail(id?: any) {
    return Axios.get("/api/product/" + id);
  }
  create(data?: any) {
    return Axios.post("/api/product", data);
  }
  update(id: any, data?: any) {
    return Axios.put("/api/product/" + id, data);
  }
  delete(id: any) {
    return Axios.delete("/api/product/" + id);
  }
}
