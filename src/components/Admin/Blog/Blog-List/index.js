import React from "react";
import { List, Icon, Button, Modal, notification } from "antd";
import { Link } from "react-router-dom";

import "./Blog-List.scss";

const { confirm } = Modal;

export const BlogList = ({ posts }) => {
  return (
    <div>
      <List
        dataSource={posts.docs}
        renderItem={(post) => <Post post={post} />}
      />
    </div>
  );
};

function Post({ post }) {
  return (
    <List.Item
      actions={[
        <Link to={`/blog/${post.url}`}>
          <Button type="primary">
            <Icon type="eye" />
          </Button>
        </Link>,
        <Button type="">
          <Icon type="edit" />
        </Button>,
        <Button type="danger">
          <Icon type="delete" />
        </Button>,
      ]}
    >
      <List.Item.Meta title={post.title} />
    </List.Item>
  );
}
