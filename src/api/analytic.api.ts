import Axios from "axios";

export class AnalyticApi {
  getAnalyticSeller() {
    return Axios.get("/api/analytics/seller");
  }
  mostSalesProduct() {
    return Axios.get("/api/analytics/most-product");
  }
}
