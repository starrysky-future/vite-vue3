import http from "./request";

export const getLogin = (params: object) => {
  return http.post("/user/login", params);
};

export const getRegister = (params: object) => {
  return http.post("/user/register", params);
};
