import React, { useState, memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBiblioteca } from "../utils/api";
import { validateForm, loginValidationRules } from "../utils/validation";
import { ROUTES } from "../utils/constants";
import style from '../pages/style.module.css';
import NavLinks from "../components/NavLinks";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";

const Login = memo(() => {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback(({ currentTarget: input }) => {
    setFormData(prev => ({ ...prev, [input.name]: input.value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = "http://localhost:3001/login";
      const { data: res } = await axios.post(url, formData);
      localStorage.setItem("token", res.token);
      navigate("/apiBooks");
    } catch (error) {
      if (error.response?.status >= 400 && error.response?.status <= 500) {
        setError(error.response.data.message || "Login ou senha incorretos!");
      } else {
        setError("Erro ao conectar com o servidor. Tente novamente.");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }, [formData, navigate]);

  return (
    <div className={style.login_container}>
      <NavLinks />
      <form className={style.login_form_container} onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">Login</h1>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="form-control"
            value={formData.email}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Senha"
            name="senha"
            onChange={handleChange}
            className="form-control"
            value={formData.senha}
            required
            disabled={loading}
          />
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          className={`${style.green_btn} w-100 mb-3`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Entrando...
            </>
          ) : (
            'Login'
          )}
        </button>

        <p className="text-center mb-0">
          <Link to="/PrimeiroAcesso" className={style.firstAcess}>
            Não possui uma conta? Cadastre-se!
          </Link>
        </p>
      </form>
    </div>
  );
});

Login.displayName = 'Login';

export default Login;
