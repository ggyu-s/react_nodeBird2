import { Button, Input } from "antd";
import Form from "antd/lib/form/Form";
import Link from "next/link";
import { useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import UseInput from "../hooks/useInput";

const ButtonWrapper = styled(Button)`
  margin-top: 10px;
`;
const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = ({ setIsLoggedIn }) => {
  const [id, onChangeId] = UseInput("");
  const [password, onChangePassword] = UseInput("");

  // preventDefault() 함수를 내장하고 있음.
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <ButtonWrapper>회원가입</ButtonWrapper>
          </a>
        </Link>
      </div>
    </FormWrapper>
  );
};

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};
export default LoginForm;
