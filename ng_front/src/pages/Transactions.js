import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import requestAccountApi from "../services/api/account";

function Transactions() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("");
  const [date, setDate] = useState(null);

  useEffect(() => {
    const promise = requestAccountApi.getTransactions(token);
    promise.then((response) => {
      setTransactions(response.data);
    });
  }, [token]);

  function handleSubmit(e) {
    e.preventDefault();
    const promise = requestAccountApi.getTransactions(token, type, date);
    promise.then((response) => {
      setTransactions(response.data);
    });
    promise.catch((e) => {
      alert(e.response.data);
      console.log(e.response.data);
    });
  }

  return (
    <>
      <Header />
      <TransactionsBody>
        <form onSubmit={handleSubmit}>
          <input type="date" onChange={(e) => setDate(e.target.value)}></input>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option></option>
            <option value="cashin">Cash-In</option>
            <option value="cashout">Cash-Out</option>
          </select>
          <button>Pesquise com filtro</button>
        </form>
        {transactions.length > 0 ? (
          transactions.map((transaction) => {
            return (
              <>
                <Transaction>
                  <span>{new Date(transaction.createdAt).toLocaleDateString("pt-BR")}</span>
                  <p>
                    {transaction.debitedAccount.User.username} to {transaction.creditedAccount.User.username}
                  </p>
                  <p>R$ {Number(transaction.value).toFixed(2)}</p>
                </Transaction>
              </>
            );
          })
        ) : (
          <h4>There are no transactions yet</h4>
        )}
      </TransactionsBody>
      <Footer />
    </>
  );
}

const TransactionsBody = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    margin-bottom: 30px;
  }
  form * {
    margin: 15px;
  }
`;

const Transaction = styled.div`
  display: flex;
  background-color: gray;
  margin-bottom: 20px;

  * {
    margin: 10px;
  }
`;

export default Transactions;
