import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/form-styles.css";

export const Form = ({ route, method }: { route: string; method: string }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access),
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setUsername("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        disabled={loading}
        className="form-input"
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        disabled={loading}
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className=" form-button" type="submit" disabled={loading}>
        {name}
      </button>
    </form>
  );
};
