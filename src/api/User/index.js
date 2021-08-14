/**
 *   EndPoinst API
 **/

import { API_VERSION, BASE_API_PATH } from "./../config";

/**
 * Conecta con la API SignUp
 * @param {Object} data
 */
export const signUpApi = async (data) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/signUp`;

  console.log(urlApi);
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(urlApi, params);
  const result = await response.json();
  console.log(result);

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
