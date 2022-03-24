import http from "./httpService";

const authApiEndpoint = "/auth/users/";
const recoveryApiEndpoint = "/auth/recovery/";
const dalUserApiEndpoint = "/dmsfront/dalusers/";
const chaplainApiEndpoint = "/dmsfront/chaplains/";

export function register(user) {
  return http.post(authApiEndpoint, {
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    password: user.password,
    is_staff: user.is_staff,
  });
}

export function updatePassword(email, password) {
  return http.put(recoveryApiEndpoint, {
    email: email,
    password: password,
  });
}

export function updateChaplainDetails(user_id, phone, religion, description) {
  return http.put(`${chaplainApiEndpoint}${user_id}`, {
    user_id: user_id,
    phone: phone,
    religion: religion,
    description: description,
  });
}

export function updateStudentDetails(user_id, phone) {
  return http.put(`${dalUserApiEndpoint}${user_id}`, {
    user_id: user_id,
    phone: phone,
  });
}

export function registerDalUser(user) {
  return http.post(dalUserApiEndpoint, {
    user_id: user.user_id,
    phone: user.phone,
  });
}

export function registerChaplain(user) {
  return http.post(chaplainApiEndpoint, {
    user_id: user.user_id,
    phone: user.phone,
    religion: user.religion,
    description: user.description,
  });
}
