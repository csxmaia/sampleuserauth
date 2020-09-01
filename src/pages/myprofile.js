import React, { useState, useEffect } from "react";
import api from "../services/api";

import Template from "../components/template";
import Form from "../components/Form";

const theme = "is-primary";

export default function MyProfile() {
  const [id, setId] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("xcxcxcxcxcxc");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    async function getProfileInfo() {
      try {
        const response = await api.get("/profile/info", {
          headers: { token: localStorage.getItem("SUS_TOKEN") },
        });
        const { data } = response.data;
        setId(data.id);
        setUsername(data.username);
        setEmail(data.email);
        setName(data.name);
        setNumber(data.number);
        setCreatedAt(data.createdAt);
        setUpdatedAt(data.updatedAt);
      } catch (err) {
        console.log(err.response);
      }
      // const response = await api.get("");
    }
    getProfileInfo();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("handled");
    try {
      const response = await api.post(
        "/profile/update",
        { name, number },
        {
          headers: {
            token: localStorage.getItem("SUS_TOKEN"),
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <Template themeParams={theme}>
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column"></div>
            <div className="column is-8">
              <h2 className="title">Me</h2>
              <Form title="My Profile" onSubmit={handleSubmit}>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Id</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <div className="box id is-primary">
                          <h2>{id}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Username</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input className="input" value={username} disabled />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Email</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          value={email}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Password</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          value={password}
                          type="password"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Name</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Number</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">CreatedAt</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input className="input" value={createdAt} disabled />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">UpdatedAt</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input className="input" value={updatedAt} disabled />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div
                    className="control is-flex"
                    style={{ justifyContent: "flex-end" }}
                  >
                    <button type="submit" className="button is-primary">
                      Update
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
