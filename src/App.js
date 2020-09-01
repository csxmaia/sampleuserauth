import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

import { ProviderContext } from "./authProvider";

import Main from "./pages/main";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import MyProfile from "./pages/myprofile";

import Loading from "./components/loading";

const PrivateRoute = (props) => {
  const navigate = useNavigate();

  // const [isLogged, setIsLogged] = useState(false);
  const [isLoadded, setIsLoadded] = useState(false);
  const [user, setUser] = useState(false);

  //props.elements is the real element but when Element(component-styled) recieve props.elements, the element goes to props.element.type 🤔
  //and the props of element setted in Routes can access by props.element.props
  const Element = props.element.type;

  useEffect(() => {
    async function fetchData() {
      const authVerify = await isAuthenticated();
      if (!authVerify.success) navigate("/login");
      setUser(authVerify.user);
      // setIsLogged(authVerify.success)
      //done.
      setIsLoadded(true);
    }
    fetchData();
  }, [navigate]);

  //In use because when navigate inside the render, onde navigate react router return an error:
  //Cannot update a component (`BrowserRouter`) while rendering a different component (`PrivateRoute`)
  //fix navigate to login on useEffect when all is loadded (true) and login is false (isnt logged)
  //Cannot update a component from inside the function body of a different component.
  //Bug: too hard to fix "Cannot update a component from inside the function body of a different component."#18178
  //(https://github.com/facebook/react/issues/18178#issuecomment-595846312)
  // useEffect(() => {
  //   if( isLoadded === true && isLogged === false) navigate("/login")
  // },[isLogged, isLoadded, navigate])

  if (!isLoadded) {
    return <Loading />;
  }

  return (
    <Route
      {...props}
      element={<Element user={user} {...props.element.props} />}
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <ProviderContext>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <PrivateRoute path="/dashboard" element={<Dashboard />} />
          <PrivateRoute path="/me" element={<MyProfile />} />
        </Routes>
      </ProviderContext>
    </BrowserRouter>
  );
}

export default App;
