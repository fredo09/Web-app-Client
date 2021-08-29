/**
 *   Hook personalizado para deslogear usuario y revisar si el token ha expirado
 **/

import { useContext } from "react";
import { AuthContext } from "./../../providers/AuthProvider";

//Exportamos el useContext con el provider
export default () => useContext(AuthContext);
