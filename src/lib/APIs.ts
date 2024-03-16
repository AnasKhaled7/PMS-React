const BASE_URL: string = "https://upskilling-egypt.com:3003/api/v1";

const BASE_USERS: string = `${BASE_URL}/Users`;

export const userURLs = {
  base: BASE_USERS,
  loginAPI: `${BASE_USERS}/Login`,
  forgotPassAPI: `${BASE_USERS}/Reset/Request`,
  resetPassAPI: `${BASE_USERS}/Reset`,
};
