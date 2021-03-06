import { Button, Input } from "antd";
import Form from "antd/lib/form/Form";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import UseInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const ButtonWrapper = styled(Button)`
  margin-top: 10px;
`;
const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = UseInput("");
  const [password, onChangePassword] = UseInput("");

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  // preventDefault() 함수를 내장하고 있음.
  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          required
          type="email"
        />
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
        <Button type="primary" htmlType="submit" loading={logInLoading}>
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

export default LoginForm;
