import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Template from "../components/template";

const theme = "is-info";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <Template themeParams={theme}>
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column"></div>
            <div className="column is-8">
              <h2 className="title">Dashboard</h2>
              <div
                className="box is-flex"
                style={{ height: "500px", flexDirection: "row" }}
              >
                <div style={{ flex: "1" }}>
                  <button className="button" onClick={() => navigate("/me")}>
                    <p>My profile</p>
                  </button>
                </div>
                <div
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "flex-end",
                    }}
                  >
                    <h2 className="title has-text-black">1</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    </Template>
  );
}
