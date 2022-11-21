import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import requestAuthApi from "../services/api/auth.js";
import useAuth from "../hooks/useAuth";

function SignIn() {
  const { signIn, token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  });

  const [userSignIn, setSignIn] = useState({
    username: "",
    password: "",
  });
  const [signInStatus, setSignInStatus] = useState(false);

  function handleInputs(e, property) {
    setSignIn({ ...userSignIn, [property]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSignInStatus(true);
    const promise = requestAuthApi.signIn(userSignIn);
    promise.then((response) => {
      setSignInStatus(false);
      signIn(response.data.token, response.data.picture);
      navigate("/home");
    });
    promise.catch((e) => {
      alert(e.response.data.error || e.response.data[0]);
      console.log(e.response.data);
      setSignInStatus(false);
    });
  }

  return (
    <>
      <Container>
        <NGCash>
          <h1>NG.Cash!</h1>
          <p>A CARTEIRA DA NOVA GERAÇÃO.</p>
          <p>É para todas as idades!</p>
        </NGCash>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            value={userSignIn.username}
            onChange={(e) => handleInputs(e, "username")}
            minLength={3}
            required
            disabled={signInStatus}
          />
          <input
            type="password"
            placeholder="password"
            value={userSignIn.password}
            onChange={(e) => handleInputs(e, "password")}
            autoComplete="on"
            minLength={8}
            required
            disabled={signInStatus}
          />
          <button disabled={signInStatus}>Log In</button>
          <p onClick={() => navigate("/signup")}>First time? Create an account!</p>
        </form>
      </Container>
    </>
  );
}

export default SignIn;

const Container = styled.div`
  display: flex;

  form {
    width: 40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input {
    width: 80%;
    height: 65px;
    background: #ffffff;
    border-radius: 6px;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #9f9f9f;
    padding-left: 10px;
    margin-bottom: 13px;
  }

  button {
    width: 80%;
    height: 65px;
    background: #1877f2;
    border-radius: 6px;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
    margin-bottom: 14px;
  }

  form p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #ffffff;
  }

  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;

    form {
      margin-top: 40px;
      width: 100%;
    }

    input {
      width: 330px;
      height: 55px;
    }

    button {
      width: 330px;
      height: 55px;
    }

    form p {
      font-size: 17px;
      line-height: 20px;
    }
  }
`;

const NGCash = styled.div`
  background-color: #151515;
  color: #ffffff;
  width: 60vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding-left: 144px;

  h1 {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
  }

  p {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }

  @media only screen and (max-width: 800px) {
    justify-content: start;
    height: fit-content;
    width: 100vw;
    padding-left: 0;
    text-align: center;
    padding-bottom: 27px;
    h1 {
      font-size: 76px;
      margin-bottom: -25px;
    }
    p {
      font-size: 23px;
      line-height: 32px;
    }
  }
`;
