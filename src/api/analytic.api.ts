import Axios from "axios";

export class AnalyticApi {
  getAnalyticSeller() {
    return Axios.get("/analytics/seller");
  }
}
