import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth/jwt/create/";
const apiUserEndpoint = "/auth/users/me/";
const apiChaplainEndpoint = "/dmsfront/chaplains/";
const apiDalUserEndpoint = "/dmsfront/dalusers/";
const tokenKey = "dms_token";

async function login(email, password) {
  const { data } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, data.access);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

async function getCurrentUser() {
  try {
    const jwt = getJwt();
    if (jwt === null) return null;
    jwtDecode(jwt);

    http.setJwt(jwt);
    const { data } = await http.get(apiUserEndpoint);
    if (data.is_staff) {
      const { data: chaplain } = await http.get(
        `${apiChaplainEndpoint}${data.id}`
      );
      return chaplain;
    } else {
      const { data: daluser } = await http.get(
        `${apiDalUserEndpoint}${data.id}`
      );
      return daluser;
    }
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
