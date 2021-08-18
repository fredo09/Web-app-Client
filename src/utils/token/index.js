/**
 *   Manejamos el token de la aplicacion
 **/

import { TOKEN, REFRES_TOKEN } from "./../constants";

/**
 * Setea el token en el localStorage
 * @param {String} token
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN, token);
};

/**
 * Obtiene el token del localStorage
 * @param {String} token
 */
export const getToken = (token) => {
  localStorage.getItem(TOKEN, token);
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
  localStorage.setItem(REFRES_TOKEN, token);
};

/**
 * Obtiene el token del localStorage
 * @param {*} token
 */
export const getRefresToken = (token) => {
  localStorage.getItem(REFRES_TOKEN, token);
};

/**
 * Remueve el token del localStorage
 * @param {*} token
 */
export const removeRefresToken = (token) => {
  localStorage.removeItem(REFRES_TOKEN);
};
