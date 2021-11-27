/**
 *   EndPoinst API
 **/

import { API_VERSION, BASE_API_PATH } from "./../config";

/**
 * Conecta con el endPoint para obtener los datos del menus
 * @returns
 */
export const getMenuApi = () => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/get-menus`;

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

/**
 * Conecta con el endPoint para actualizar los datos del menus
 * @param {*} token_
 * @param {*} idMenu
 * @param {*} params
 * @returns
 */
export const updateMenuApi = (token_, idMenu, data) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/update-menu/${idMenu}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token_,
    },
    body: JSON.stringify(data),
  };

  return fetch(urlApi, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err;
    });
};

/**
 * Conecta con el endPoint para actualizar el estatus de activo del menus
 * @param {*} token_
 * @param {*} menuId
 * @param {*} statusActive
 * @returns
 */
export const activateMenuApi = (token_, menuId, statusActive) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/active-menu/${menuId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token_,
    },
    body: JSON.stringify({ active: statusActive }),
  };

  return fetch(urlApi, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err;
    });
};

/**
 * Conecta con el endPoint para agregar nuevos menus
 * @param {*} token_
 * @param {*} menu
 * @returns
 */
export const addMenuApi = (token_, menu) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/add-menu`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token_,
    },
    body: JSON.stringify(menu),
  };

  return fetch(urlApi, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err;
    });
};

/**
 * Conecta con el endPoint para Eliminar menus
 * @param {*} token_
 * @param {*} idMenu
 * @returns
 */
export const deleteMenuApi = (token_, idMenu) => {
  const urlApi = `${BASE_API_PATH}/${API_VERSION}/delete-menu/${idMenu}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token_,
    },
  };

  return fetch(urlApi, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err;
    });
};
