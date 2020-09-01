import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Template from "../components/template";
import Form from "../components/Form";
import { doLogin } from "../auth";
import { AuthContext } from "../authProvider";

import "./styles.css";
const theme = "is-info";

export default function Login() {
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({
    showPassword: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await doLogin(username, password);
    onLogin(response);
    if (response.status === 200) navigate("/dashboard");
  }

  return (
    <Template themeParams={theme}>
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column"></div>
            <div className="column is-4">
              <Form title="Login" onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      type="text"
                      placeholder="username"
                    />
                    <span className="icon is-left">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="field has-addons">
                    <div className="control has-icons-left is-expanded">
                      <input
                        className="input"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type={`${state.showPassword ? "text" : "password"}`}
                        placeholder="password"
                      />
                      <span className="icon is-left">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    <div className="control">
                      <button
                        className="button"
                        type="button"
                        onClick={() =>
                          setState({
                            ...state,
                            showPassword: !state.showPassword,
                          })
                        }
                      >
                        <i className="fas fa-eye" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div
                    className="control is-flex"
                    style={{ justifyContent: "flex-end" }}
                  >
                    <button
                      className={`button is-link ${"is-primary"}`}
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </Form>
            </div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    </Template>
  );
}
