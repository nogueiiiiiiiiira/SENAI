import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ApiBooksComponent } from "./pages/apiBooks";
import Books from "./pages/books";
import Readers from "./pages/readers";
import Rets from "./pages/returns";
import Librarians from "./pages/librarians";
import Loans from "./pages/loans";
import Fines from "./pages/fines";
import Login from "./pages/login";
import PrimeiroAcesso from "./pages/primeiroAcesso";
import SobreNos from "./pages/sobreNos";
import HomePage from "./pages/homePage";
import Contact from "./pages/contact";
import Mensagens from "./pages/verMensagens.jsx";
import Historico from "./pages/verHistorico.jsx";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/apiBooks" element={<ApiBooksComponent />} />
      <Route path="/Books" element={<Books />} />
      <Route path="/Readers" element={<Readers />} />
      <Route path="/Returns" element={<Rets />} />
      <Route path="/Librarians" element={<Librarians />} />
      <Route path="/Loans" element={<Loans />} />
      <Route path="/Fines" element={<Fines />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/PrimeiroAcesso" element={<PrimeiroAcesso />} />
      <Route path="/SobreNos" element={<SobreNos />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/contatos" element={<Contact />} />
      <Route path="/mensagens" element={<Mensagens />} />
      <Route path="/historico" element={<Historico />} />
    </Routes>
  );
};

export default AppRoutes;
