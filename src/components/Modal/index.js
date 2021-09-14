/**
 *   Componente Modal
 **/

import React from "react";
import { Modal as ModalAntd } from "antd";

import "./Modal.scss";

export const Modal = ({ children, title, isVisible, setIsVisible }) => {
  //cerramos el modal
  const CloseModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalAntd
      className="modal"
      title={title}
      centered
      visible={isVisible}
      onCancel={CloseModal}
    >
      {children}
    </ModalAntd>
  );
};
