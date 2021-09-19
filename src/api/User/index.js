/**
 *   EndPoinst API
 **/

import { API_VERSION, BASE_API_PATH } from "./../config";

/**
 * Conecta con la API SignUp
 * @param {Object} data -> data para dar de registro a usuario
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
 * @param {*} data -> data con info de usuario que se intenta logear
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

/**
 * Trae todos los usuarios conectando con el endpoint users
 * @param {*} token_ -> token de autorizacion
 * @returns
 */
export const getUsersApi = async (token_) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/users`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token_,
    },
  };

  const response = await fetch(urlApi, params);

  const result = await response.json();

  if (result) {
    if (result.status === "OK") {
      return result;
    } else if (result.status === "ERROR") {
      return result.message;
    }
  } else {
    return null;
  }
};

/**
 * Conecta con la api para traer los usuarios activos o inactivos segun el parametro status
 * @param {String} token_ -> token de autorizacion
 * @param {Boolean} status -> Valor true o false
 * @returns
 */
export const getUsersActiveApi = async (token_, status) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/users-actived?active=${status}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token_,
    },
  };

  const response = await fetch(urlApi, params);

  const result = await response.json();

  if (result) {
    if (result.status === "OK") {
      return result;
    } else if (result.status === "ERROR") {
      return result.message;
    }
  } else {
    return null;
  }
};

/**
 * Conecta con el endPoint de actualizar avatar del usuario
 * @param {String} token_ token de autentificacion
 * @param {Object} avatar archivo de imagene para avatar
 * @param {String} userId id del usuario
 * @returns
 */
export const uploadAvatarApi = (token_, avatar, userId) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/updateAvatar/${userId}`;

  //instacia para enviar informacion a una api esto para enviar alguna image
  const formData = new FormData();

  formData.append("avatar", avatar, avatar.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token_,
    },
  };

  return fetch(urlApi, params)
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

/**
 * Conecta con el endPoint para obtener la ruta del avatar del usuario
 * @param {String} avatarName  path del avatar
 * @returns
 */
export const getAvatarApi = (avatarName) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/get-avatar/${avatarName}`;

  return fetch(urlApi)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
};

/**
 * Conecta con el endPoint para actualizar informacion del usuario
 * @param {String} token_ token de autentificacion
 * @param {String} userId id del usuario
 * @param {Object} user informacion del usuario
 * @returns
 */
export const updateUserApi = (token_, userId, user) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/updateUser/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token_,
    },
    body: JSON.stringify(user),
  };

  return fetch(urlApi, params)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err);
      return err.message;
    });
};
