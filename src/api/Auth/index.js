/**
 *  TRABAJAMOS EN EL TOKEN DEL USUARIO
 **/

import { API_VERSION, BASE_API_PATH } from "./../config";
import {
  getToken,
  getRefresToken,
  setToken,
  setRefresToken,
  removeToken,
  removeRefresToken,
} from "./../../utils/token";
import jwtDecode from "jwt-decode";
import { REFRES_TOKEN, TOKEN } from "../../utils/constants";

/**
 * Devuelve el token de logueo del usuario despues de ciertas validaciones
 * @returns regresa null si el token ha expirado y el token si esta vigente
 */
export const getVerifiedToken = () => {
  const token_ = getToken();

  if (!token_ || token_ === "null") {
    return null;
  }
  return willExpireToken(token_) ? null : token_;
};

/**
 * Devuelve el Refreshtoken de logueo del usuario despues de ciertas validaciones
 * @returns regresa null si el token ha expirado y el token si esta vigente
 */
export const getVerifiedRefreshToken = () => {
  const refresToken_ = getRefresToken();

  if (!refresToken_ || refresToken_ === "null") {
    return null;
  }

  return willExpireToken(refresToken_) ? null : refresToken_;
};

/**
 * Funcion que conecta al enpoint resfress-token
 * @param {*} resfressToken_
 * @returns
 */
export const refressTokenApi = async (resfressToken_) => {
  const url = `${BASE_API_PATH}/${API_VERSION}/refress-token`;

  //body de params para la api
  const payload = {
    refresToken: resfressToken_,
  };

  const params = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };

  //fetch
  const response = await fetch(url, params);

  if (response.status !== 200) return null;

  const result = await response.json();

  console.log(result);

  // EL VALOR ES TRUE SI EL TOKEN YA CADUCO
  if (!result) {
    // TO DO: deslogeamos el usuario
    logaut();
  } else {
    // obtenemos la respuesta del endpoint del back refress-token
    if (result.status === "OK") {
      const { token, refresToken } = result;

      //refrescamos el token
      setToken(token);
      setRefresToken(refresToken);
    } else if (result.status === "ERROR") {
      return result;
    }
  }
};

/**
 * Revisamos que el token no ha expirado asi devolviendo true si ha caducado y false si esta vigente
 * @param {String} token_
 * @returns
 */
const willExpireToken = (token_) => {
  const seconds = 60;
  const metaToken = jwtDecode(token_);

  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;

  return now > exp;
};

export const logaut = () => {
  removeToken(TOKEN);
  removeRefresToken(REFRES_TOKEN);
};
