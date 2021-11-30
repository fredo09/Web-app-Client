/**
 *   Componente Link Social
 **/

import React from "react";
import { ReactComponent as IconYoutube } from "./../../../assets/svg/youtube.svg";
import { ReactComponent as IconTwitter } from "./../../../assets/svg/twitter.svg";
import { ReactComponent as IconFacebook } from "./../../../assets/svg/facebook.svg";
import { ReactComponent as IconLinkedin } from "./../../../assets/svg/linkedin.svg";

import "./Social-Links.scss";

export const SocialLink = () => {
  return (
    <div className="social-links">
      <a href="#" className="youtube" target="_blank">
        <IconYoutube />
      </a>

      <a href="#" className="facebook" target="_blank">
        <IconFacebook />
      </a>
      <a
        href="https://twitter.com/fredojimenez1"
        className="twitter"
        target="_blank"
      >
        <IconTwitter />
      </a>
      <a
        href="https://www.linkedin.com/in/alfredo-vazquez-63a556a8/"
        className="linkedin"
        target="_blank"
      >
        <IconLinkedin />
      </a>
    </div>
  );
};
