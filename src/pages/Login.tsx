// pages/Login.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard");
    }
  }, [isLogin, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username wajib diisi");
      return;
    }

    if (!password.trim()) {
      setError("Password wajib diisi");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Username atau Password salah");
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Logo / Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <img
              src="/img/teguhdev_color.png"
              alt="Teguh Dev"
              className="brand-logo"
            />
          </div>
          <h1 className="login-title">Dashboard</h1>
          <p className="login-subtitle">Masuk ke dashboard manajemen</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="login-alert login-alert-error">
            <svg
              className="alert-icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
                fill="#ef4444"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Form Login */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label" htmlFor="username">
              Username
            </label>
            <div className="login-input-wrapper">
              <svg
                className="input-icon"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10ZM10 12.5C6.7 12.5 0 14.2 0 17.5V20H20V17.5C20 14.2 13.3 12.5 10 12.5Z"
                  fill="#6b7280"
                />
              </svg>
              <input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
                disabled={isLoading}
                autoFocus
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <div className="login-input-wrapper">
              <svg
                className="input-icon"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 0C7.23858 0 5 2.23858 5 5V7H4C1.79086 7 0 8.79086 0 11V17C0 19.2091 1.79086 21 4 21H16C18.2091 21 20 19.2091 20 17V11C20 8.79086 18.2091 7 16 7H15V5C15 2.23858 12.7614 0 10 0ZM10 2C11.6569 2 13 3.34315 13 5V7H7V5C7 3.34315 8.34315 2 10 2ZM10 13C11.1046 13 12 13.8954 12 15C12 16.1046 11.1046 17 10 17C8.89543 17 8 16.1046 8 15C8 13.8954 8.89543 13 10 13Z"
                  fill="#6b7280"
                />
              </svg>
              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                disabled={isLoading}
              />
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="login-spinner"></span>
                Memproses...
              </>
            ) : (
              "Masuk"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>
            &copy; {new Date().getFullYear()} Teguh Dev. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
