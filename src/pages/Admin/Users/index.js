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
    getUsersActiveApi(token_, true).then((response) => {
      console.log(response);
      getListUsersActive(response.usuariosAcvtive);
    });

    getUsersActiveApi(token_, false).then((response) => {
      getListUsersNotActive(response.usuariosAcvtive);
    });
    setReloadUsersPage(false);
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
