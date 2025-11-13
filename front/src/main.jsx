import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const ApiBooksComponent = lazy(() => import("./pages/apiBooks").then(module => ({ default: module.ApiBooksComponent })));
const Books = lazy(() => import("./pages/books"));
const Readers = lazy(() => import("./pages/readers"));
const Rets = lazy(() => import("./pages/returns"));
const Librarians = lazy(() => import("./pages/librarians"));
const Loans = lazy(() => import("./pages/loans"));
const Fines = lazy(() => import("./pages/fines"));
const Login = lazy(() => import("./pages/login"));
const PrimeiroAcesso = lazy(() => import("./pages/primeiroAcesso"));
const SobreNos = lazy(() => import("./pages/sobreNos"));
const HomePage = lazy(() => import("./pages/homePage"));
const Contact = lazy(() => import("./pages/contact"));
const Mensagens = lazy(() => import("./pages/verMensagens.jsx"));
const Historico = lazy(() => import("./pages/verHistorico.jsx"));

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const router = createBrowserRouter([
  { path: "/apiBooks", element: <Suspense fallback={<LoadingSpinner />}><ApiBooksComponent /></Suspense> },
  { path: "/Books", element: <Suspense fallback={<LoadingSpinner />}><Books /></Suspense> },
  { path: "/Readers", element: <Suspense fallback={<LoadingSpinner />}><Readers /></Suspense> },
  { path: "/Returns", element: <Suspense fallback={<LoadingSpinner />}><Rets /></Suspense> },
  { path: "/Librarians", element: <Suspense fallback={<LoadingSpinner />}><Librarians /></Suspense> },
  { path: "/Loans", element: <Suspense fallback={<LoadingSpinner />}><Loans /></Suspense> },
  { path: "/Fines", element: <Suspense fallback={<LoadingSpinner />}><Fines /></Suspense> },
  { path: "/Login", element: <Suspense fallback={<LoadingSpinner />}><Login /></Suspense> },
  { path: "/PrimeiroAcesso", element: <Suspense fallback={<LoadingSpinner />}><PrimeiroAcesso /></Suspense> },
  { path: "/SobreNos", element: <Suspense fallback={<LoadingSpinner />}><SobreNos /></Suspense> },
  { path: "/", element: <Suspense fallback={<LoadingSpinner />}><HomePage /></Suspense> },
  { path: "/contatos", element: <Suspense fallback={<LoadingSpinner />}><Contact /></Suspense> },
  { path: "/mensagens", element: <Suspense fallback={<LoadingSpinner />}><Mensagens /></Suspense> },
  { path: "/historico", element: <Suspense fallback={<LoadingSpinner />}><Historico /></Suspense> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
