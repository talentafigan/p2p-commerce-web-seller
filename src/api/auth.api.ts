import Axios from "axios";

export class AuthApi {
  logout() {
    return Axios.post("/api/logout");
  }
  login(data: { key: string; password: string }) {
    return Axios.post("/api/login", {
      ...data,
      userTypeId: "2",
    });
  }
  register(data: {
    phone: string;
    username: string;
    fullname: string;
    email: string;
    password: string;
  }) {
    return Axios.post("/api/register", {
      ...data,
      userTypeId: "2",
    });
  }
  resetPasswordRequest(email: string) {
    return Axios.post("/api/reset-password/request", {
      email,
      userType: "2",
    });
  }
  resetPasswordCheckCode(code: string) {
    return Axios.post("/api/reset-password/check-code-active", {
      code,
    });
  }
  resetPasswordNewPassword(data: { newPassword: string; code: string }) {
    return Axios.post("/api/reset-password/new-password", data);
  }
}
