/**
 *   EndPoinst API
 **/

import { API_VERSION, BASE_API_PATH } from "./../config";

export const getPostApi = (limit, page) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/obtenerPosts?page=${page}&limit=${limit}`;

  console.log(urlApi);

  return fetch(urlApi)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
};
