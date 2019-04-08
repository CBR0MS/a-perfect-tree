import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import Home from "./components/Home";
import Play from "./components/Play";
import Admin from "./components/Admin";

import "./App.css";

const uuidv4 = require("uuid/v4");

const App = () => {
  const [cookies, setCookie] = useCookies(["name"]);

  useEffect(() => {
    if (cookies.userId === undefined) {
      setCookie("userId", uuidv4(), { path: "/" });
    }
  });

  return (
    <Router>
      <div>
        <Route
          exact
          path="/"
          render={props => <Home {...props} userId={cookies.userId} />}
        />
        <Route
          path="/play/:id"
          render={props => <Play {...props} userId={cookies.userId} />}
        />
        <Route path="/admin" component={Admin} />
      </div>
    </Router>
  );
};

export default App;
