import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { BsFillCollectionFill } from "react-icons/bs";

function Footer() {
  const navigate = useNavigate();

  return (
    <Container>
      <FaHome onClick={() => navigate("/home")} />
      <div>
        <span>Transações:</span>
        <BsFillCollectionFill onClick={() => navigate("/transactions")} />
      </div>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  background-color: gray;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #151515;
  padding: 15px;

  * {
    font-size: 30px;
    color: #ffffff;
  }
  span {
    margin-right: 15px;
    font-size: 20px;
  }
`;
