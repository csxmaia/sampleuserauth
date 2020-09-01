import React, {useState} from 'react'
import api from '../services/api'

import Template from '../components/template'
import Form from '../components/Form'

import "./styles.css"
const theme = "is-primary"

export default function Signup() {

  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")

  const [state, setState] = useState({
    showPassword: false,
    notification: {},
  })

  async function handleSubmit(e) {
    e.preventDefault();
    let notif
    try {
      const response = await api.post('/signup', {
        username,
        email,
        password,
        name,
        number
      })
      notif = response
    } catch (error) {
      notif = error.response
    }
    Notification({status: notif.status, statusText: notif.statusText})

  }

  function Notification (args) {
    let type = ""
    if(args.status){
      switch(true){
        case (args.status === 200):
          type = "is-success"
          break
        case (args.status >= 400 && args.status <= 451):
          type = "is-danger"
          break
        case (args.status >= 500 && args.status <= 511):
          type = "is-warning"
          break
        default:
          type = "is-primary"
          break
      }
      setState({...state, notification: {visible: true, type:type, msg: args.statusText}})
    }
  }

  async function handlePassword() {
    setState({...state, showPassword: !state.showPassword})
  }

  return (
    <Template themeParams={theme}>
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column"></div>
            <div className="column is-5">
              <Form
                title="Sign Up"
                onSubmit={handleSubmit}
              >
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-success is-danger"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      type="text"
                      placeholder="username"
                    />
                    <span className="icon is-left">
                      <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
                  <p className="help is-success">This username is available</p>
                  <p className="help is-danger">This username is invalid</p>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="email"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder="Nome"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Number</label>
                  <div className="control">
                    <input
                      className="input"
                      type="tel"
                      onChange={(e) => setNumber(e.target.value)}
                      value={number}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="field has-addons">
                    <div className="control has-icons-left is-expanded">
                      <input
                        className="input"
                        type={state.showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                    <div className="control">
                      <button
                        className="button"
                        type="button"
                        onClick={handlePassword}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="field is-grouped">
                  <div className="control" style={{ flex: 1 }}>
                    <a className="button" href="/">
                      Cancel
                    </a>
                  </div>
                  <div
                    className="control"
                    style={{ flex: 1, textAlign: "end" }}
                  >
                    <button
                      type="submit"
                      className="button is-primary"
                    >
                      Submit
                    </button>
                  </div>
                </div>

                {state.notification.visible && (
                  <div
                    className={`notification mx-4 my-4 ${state.notification.type}`}
                  >
                    <button
                      type="button"
                      onClick={() => setState({ ...state, notification: {} })}
                      className="delete"
                    ></button>
                    {state.notification.msg}
                  </div>
                )}
              </Form>
            </div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    </Template>
  );
}