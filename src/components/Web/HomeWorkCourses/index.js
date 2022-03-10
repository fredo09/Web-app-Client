import React from "react";
import { Icon, Row, Col, Card } from "antd";

import "./HomeWorkCourses.scss";

export const HomeWorkCourses = () => {
  return (
    <Row className="my-courses-work">
      <Col lg={24} className="my-courses-work__title">
        <h2>Como Funcionan mis cursos.</h2>
        <h3>
          Cada uno de los cursos esta en udemy, activa las 24 horas los 365
          dias.
        </h3>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-cards">
          <Col md={8}>
            <CardItem
              icon="clock-circle"
              title="Cursos y Clases"
              subtitle="Maximo conocimiento en cursos y clases"
            />
          </Col>
          <Col md={8}>
            <CardItem
              icon="key"
              title="Cursos y Clases"
              subtitle="Maximo conocimiento en cursos y clases"
            />
          </Col>
          <Col md={8}>
            <CardItem
              icon="message"
              title="Cursos y Clases"
              subtitle="Maximo conocimiento en cursos y clases"
            />
          </Col>
        </Row>
        <Row className="row-cards">
          <Col md={8}>
            <CardItem
              icon="user"
              title="Cursos y Clases"
              subtitle="Maximo conocimiento en cursos y clases"
            />
          </Col>
          <Col md={8}>
            <CardItem
              icon="dollar"
              title="Cursos y Clases"
              subtitle="Maximo conocimiento en cursos y clases"
            />
          </Col>
          <Col md={8}>
            <CardItem
              icon="message"
              title="Cursos y Clases"
              subtitle="Maximo conocimiento en cursos y clases"
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
    </Row>
  );
};

function CardItem({ icon, title, subtitle }) {
  const { Meta } = Card;
  return (
    <Card className="my-courses-work__card">
      <Icon type={icon} />
      <Meta title={title} description={subtitle} />
    </Card>
  );
}
