/**
 *   Creamos el Provider para logueo de usuario y de check de token ha caducado
 **/

import { createContext, useState, useEffect } from "react";
import {
  getVerifiedToken,
  getVerifiedRefreshToken,
  logaut,
  refressTokenApi,
} from "./../../api/Auth";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });

  //useEffect para invocar la funcion que checa si el usuario se esta logueado o no
  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

/**
 * Comprueba si el usuario en cuestion esta logeado
 * @param {*} setUser
 */
function checkUserLogin(setUser) {
  const accessToken_ = getVerifiedToken();

  //si el token ya caduco entonces:
  if (!accessToken_) {
    const resfressToken_ = getVerifiedRefreshToken();

    if (!resfressToken_) {
      logaut();
      setUser({
        user: null,
        isLoading: false,
      });
    } else {
      //refrescamos el refressToken
      refressTokenApi(resfressToken_);
    }
  } else {
    //Si el token es valido entonces:
    setUser({
      user: jwtDecode(accessToken_),
      isLoading: false,
    });
  }
}
