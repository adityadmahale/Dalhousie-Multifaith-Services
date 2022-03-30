import http from "./httpService";

const chaplainsAPIEndpoint = "/dmsfront/chaplains/";

export const getChaplains = () => {
  return http.get(`${chaplainsAPIEndpoint}`);
};
