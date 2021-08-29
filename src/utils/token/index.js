/**
 *   Manejamos el token de la aplicacion
 **/

import { TOKEN, REFRES_TOKEN } from "./../constants";

/**
 * Setea el token en el localStorage
 * @param {String} token
 */
export const setToken = (token) => {
  return localStorage.setItem(TOKEN, token);
};

/**
 * Obtiene el token del localStorage
 * @param {String} token
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN);
};

/**
 * Remueve el token del localStorage
 * @param {String} token
 */
export const removeToken = (token) => {
  localStorage.removeItem(TOKEN);
};

/**
 * Setea el token en el localStorage
 * @param {*} token
 */
export const setRefresToken = (token) => {
  return localStorage.setItem(REFRES_TOKEN, token);
};

/**
 * Obtiene el token del localStorage
 * @param {*} token
 */
export const getRefresToken = () => {
  return localStorage.getItem(REFRES_TOKEN);
};

/**
 * Remueve el token del localStorage
 * @param {*} token
 */
export const removeRefresToken = (token) => {
  localStorage.removeItem(REFRES_TOKEN);
};
