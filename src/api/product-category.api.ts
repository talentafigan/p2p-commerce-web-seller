import Axios from "axios";

export class ProductCategoryApi {
  get(params?: any) {
    return Axios.get("/api/product-category", {
      params,
    });
  }
  getDetail(id: any) {
    return Axios.get("/api/product-category/" + id);
  }
}
