import React, { useState, useCallback } from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useInput } from "../utils/useInput";
import useMembers from "../hooks/useMembers";
import useUser from "../hooks/useUser";

const Container = styled.div`
  width: 30%;
  height: 60%;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 50px 80px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 27px;
  color: black;
`;

const Form = styled.form`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const Input = styled.input`
  all: unset;
  border-radius: 10px;
  width: 85%;
  height: 30px;
  padding: 8px 15px;
  background-color: #e6e6e6;
  opacity: 0.8;
  margin-bottom: 35px;

  &:hover,
  &:focus {
    opacity: 1;
  }
`;

const SignUpBtn = styled.button`
  all: unset;
  border-radius: 10px;
  width: 85%;
  height: 30px;
  padding: 8px 15px;
  background-color: #c34c8a;
  color: white;
  font-weight: 700;
  font-size: 17px;
  text-align: center;
  cursor: pointer;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
`;

const SignUpMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  margin-bottom: 30px;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const SocailLoginBtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SocialLoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 45px;
  padding: 8px 15px;
  color: white;
  font-weight: 600;
  font-size: 17px;
  text-align: center;
  border-radius: 10px;
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
`;

const LoginForm = () => {
  const [onPasswordErrorMessage, setOnPasswordErrorMessage] = useState(false);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const { onLogInRequest } = useUser();

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      onLogInRequest({ email, password });
    },
    [email, password]
  );

  return (
    <Container>
      <TitleContainer>
        <Title>Log in</Title>
      </TitleContainer>
      <Form onSubmit={onSubmit}>
        <Input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChangeEmail}
        ></Input>
        <Input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChangePassword}
        ></Input>
        <SignUpBtn type="submit">로그인</SignUpBtn> 
      </Form>

      <SignUpMessage>
        <Link href="/signup">
          <a>아이디가 없으신가요?</a>
        </Link>
      </SignUpMessage>
      <SocailLoginBtnContainer>
        <SocialLoginBtn backgroundColor="#0984e3">
          <FaFacebook style={{ marginRight: 7 }} />
          FaceBook
        </SocialLoginBtn>
        <SocialLoginBtn backgroundColor="#D54733">
          <FaGoogle style={{ marginRight: 7 }} />
          Google
        </SocialLoginBtn>
      </SocailLoginBtnContainer>
    </Container>
  );
};

export default LoginForm;
