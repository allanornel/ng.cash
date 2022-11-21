import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import Transactions from "./pages/Transactions";

import "./assets/css/reset.css";
import "./assets/css/style.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
