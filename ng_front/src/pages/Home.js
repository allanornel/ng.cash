import { useEffect, useState } from "react";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import requestAccountApi from "../services/api/account";

function Home() {
  const { token } = useAuth();
  const [balance, setBalance] = useState(0);
  const [change, setChange] = useState(false);
  const [transaction, setTransaction] = useState({
    username: "",
    value: 0,
  });

  function handleInputs(e, property) {
    setTransaction({ ...transaction, [property]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const promise = requestAccountApi.postTransaction(token, transaction.username, transaction.value);
    promise.then((response) => {
      setChange(!change);
      alert("Transação Realizada");
    });
    promise.catch((e) => {
      alert(e.response.data);
      console.log(e.response.data);
    });
  }

  useEffect(() => {
    const promise = requestAccountApi.getBalance(token);
    promise.then((response) => {
      setBalance(response.data);
    });
  }, [token, change]);

  return (
    <>
      <Header />
      <Titulo>Minha conta NG.Cash</Titulo>
      <Display>
        <h2>Seu saldo atual: {balance}</h2>
        <form onSubmit={handleSubmit}>
          <h3>Faça uma transação:</h3>
          <input type="text" placeholder="username" value={transaction.username} onChange={(e) => handleInputs(e, "username")} required />
          <input type="number" placeholder="value" value={transaction.value} onChange={(e) => handleInputs(e, "value")} required />

          <button>Faça a Transação!</button>
        </form>
      </Display>
      <Footer />
    </>
  );
}

export default Home;

const Display = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
  margin-top: 50px;
  margin-right: 50px;
  margin-bottom: 80px;

  form {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  }
  form * {
    margin: 10px;
  }
`;

const Titulo = styled.p`
  margin-top: 100px;
  margin-left: 50px;
  font-size: 50px;
`;
