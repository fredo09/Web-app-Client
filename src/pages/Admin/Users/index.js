import React, { useState, useEffect } from "react";
import { ListUsers } from "./../../../components/Admin/Users/ListUsers";
import { notification } from "antd";
import { getVerifiedToken } from "./../../../api/Auth";
import { getUsersActiveApi } from "./../../../api/User";

import "./Users.scss";

export const Users = () => {
  const [listUsersActive, getListUsersActive] = useState([]);
  const [listUsersNotActive, getListUsersNotActive] = useState([]);
  const [reloadUsersPage, setReloadUsersPage] = useState(false);

  const token_ = getVerifiedToken();

  useEffect(() => {
    const fetchData = async () => {
      const resultActive = await getUsersActiveApi(token_, true);
      const resultNotActive = await getUsersActiveApi(token_, false);

      //validamos usuarios activos
      if (resultActive) {
        if (resultActive.status === "OK") {
          if (resultActive.usuariosAcvtive.length > 0) {
            getListUsersActive(resultActive.usuariosAcvtive);
            setReloadUsersPage(false); // recargamos la pagina otra vez
          }
        } else if (resultActive.status === "ERROR") {
          notification["error"]({
            message: resultActive.message,
          });
        }
      } else {
        notification["error"]({
          message: "Ocurrio un error al obtener informacion",
        });
      }
      //validamos usuarios no activos
      if (resultNotActive) {
        if (resultNotActive.status === "OK") {
          if (resultNotActive.usuariosAcvtive.length > 0) {
            getListUsersNotActive(resultNotActive.usuariosAcvtive);
            setReloadUsersPage(false); // recargamos la pagina otra vez
          }
        } else if (resultNotActive.status === "ERROR") {
          notification["error"]({
            message: resultNotActive.message,
          });
        }
      } else {
        notification["error"]({
          message: "Ocurrio un error al obtener informacion",
        });
      }
    };

    // ejecutamos fetchData
    fetchData();
  }, [token_, reloadUsersPage]);

  return (
    <div className="users">
      <ListUsers
        usersActive={listUsersActive}
        usersNotActive={listUsersNotActive}
        setReloadUsersPage={setReloadUsersPage}
      />
    </div>
  );
};
