/**
 *  Componente Banner Main
 **/

import React from "react";
import { Row, Col } from "antd";

import "./MainBanner.scss";

export const Banner = () => {
  return (
    <div className="main-banner">
      <div className="main-banner__dark" />

      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <h2>
            Echa un vistaso a lo nuevo <br /> con tegnologias Web y mobil.
          </h2>
          <h3>
            A través de cursos práctivos, concisos y actualizados.
            <br />
            profesionales con años de experiencia.
          </h3>
        </Col>
        <Col lg={4} />
      </Row>
    </div>
  );
};
