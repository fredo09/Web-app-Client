import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import { Modal } from "./../../../components/Modal";
import { BlogList } from "./../../../components/Admin/Blog/Blog-List";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getPostApi } from "./../../../api/Post";

import "./Blog.scss";

const Blog = ({ location, history }) => {
  const [modalTitle, setModalTitle] = useState("");
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [reloadPosts, setReloadPosts] = useState(false); // Recagamos el useFetch para los post-list

  const [post, setPost] = useState(null);

  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    getPostApi(10, page)
      .then((response) => {
        console.log(response);
        if (response.status !== "OK") {
          notification["warning"]({
            message: response.message,
          });
        } else {
          //Agregamos los posts
          setPost(response.post);
        }
      })
      .catch((err) => {
        console.log("ocurrio un error", err);
        notification["error"]({
          message: "Error del servidor",
        });
      });

    //Usando el reload
    setReloadPosts(false);
  }, [page, reloadPosts]);

  if (!post) return null;

  return (
    <div className="blog">
      <div className="blog__add-post">
        <Button type="primary">Nuevo Post</Button>
      </div>

      <BlogList posts={post} />
      {/* paginacion */}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
      />
    </div>
  );
};

export default withRouter(Blog);
