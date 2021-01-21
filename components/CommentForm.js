import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import UseInput from "../hooks/useInput";
import { useSelector } from "react-redux";

function CommentForm({ post }) {
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText] = UseInput("");
  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: "3" }}
          type="primary"
          htmlType="submit"
        >
          등록
        </Button>
      </Form.Item>
    </Form>
  );
}
CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default CommentForm;
