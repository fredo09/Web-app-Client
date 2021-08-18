/**
 *   EndPoinst API
 **/

import { API_VERSION, BASE_API_PATH } from "./../config";

/**
 * Conecta con la API SignUp
 * @param {Object} data
 * @return retorna una promesa donde viene la respuesta de la api
 */
export const signUpApi = async (data) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/signUp`;

  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(urlApi, params);
  const result = await response.json();

  if (result.status === "OK") {
    if (result.user) {
      return result;
    }
  } else {
    if (result.status === "ERROR") {
      return result;
    }
  }
};

/**
 * Conecta con la api en el endPoint signIn
 * @param {*} data
 * @returns retorna una promesa donde viene la respuesta de la api
 */
export const signInApi = async (data) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/signIn`;

  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(urlApi, params);
  const result = await response.json();

  if (result) {
    if (result.status === "OK") {
      if (result.token) {
        return result;
      }
    } else if (result.status === "ERROR") {
      return result;
    }
  }
};
