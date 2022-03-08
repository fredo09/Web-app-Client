import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";

import ReactJs from "./../../../assets/img/react-js-hooks.jpg";
import JS from "./../../../assets/img/javascript-es6.jpg";
import CssGrid from "./../../../assets/img/css-grid.jpg";
import PrestaShow from "./../../../assets/img/prestashop-1-7.jpg";
import ReactNative from "./../../../assets/img/react-native.jpg";
import WordPress from "./../../../assets/img/wordpress.jpg";

import "./Courses.scss";

export const Courses = () => {
  return (
    <Row className="home-courses">
      <Col lg={24} className="home-courses__title">
        <h2>Aprende y mejora tu habilidades</h2>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-courses">
          <Col md={6}>
            <CardCourse
              image={ReactJs}
              title="React JS Hooks"
              subtitle="Intermedio React/JS"
              link="#"
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={CssGrid}
              title="CSS Grid"
              subtitle="Intermedio CSS3"
              link="#"
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={ReactNative}
              title="React Native Expo"
              subtitle="React Native Intermedio"
              link="#"
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={JS}
              title="Basico Javascript"
              subtitle="Basico JS"
              link="#"
            />
          </Col>
        </Row>
        <Row className="row-courses">
          <Col md={6}>
            <CardCourse
              image={PrestaShow}
              title="React Native Expo"
              subtitle="React Native Intermedio"
              link="#"
            />
          </Col>
          <Col md={6}></Col>
          <Col md={6}></Col>
          <Col md={6}>
            <CardCourse
              image={WordPress}
              title="Basico Javascript"
              subtitle="Basico JS"
              link="#"
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />

      <Col lg={24} className="home-courses__more">
        <Link to="/courses">
          <Button>ver mas</Button>
        </Link>
      </Col>
    </Row>
  );
};

function CardCourse({ image, title, subtitle, link }) {
  const { Meta } = Card;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Card
        className="home-courses__card"
        cover={<img src={image} alt={title} />}
        actions={[<Button>Ingresar</Button>]}
      >
        <Meta title={title} description={subtitle} />
      </Card>
    </a>
  );
}
