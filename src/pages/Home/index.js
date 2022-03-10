import React from "react";
import { Banner } from "./../../components/Web/MainBanner";
import { Courses } from "./../../components/Web/Courses";
import { HomeWorkCourses } from "./../../components/Web/HomeWorkCourses";

export const Home = () => {
  return (
    <>
      <Banner />
      <Courses />
      <HomeWorkCourses />
    </>
  );
};
