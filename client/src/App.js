import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";

import Home from "./components/Home";
import Play from "./components/Play";
import Admin from "./components/Admin";
import Instructions from "./components/Instructions";

import VisualizeSnippet from "./components/VisualizeSnippet";
import VisualizeGame from "./components/VisualizeGame";

import "./App.css";

const uuidv4 = require("uuid/v4");

const GetRandomGame = props => {
  const [id, setId] = useState("");

  axios
    .get(`/api/games`)
    .then(res => {
      if (res.data) {
        const rand = Math.floor(Math.random() * res.data.length);
        setId(res.data[rand].id);
      }
    })
    .catch(err => console.log(err));

  let res = <div />;
  if (id !== "") {
    res = <Redirect to={`/play/${id}/`} />;
  }
  return res;
};

const App = () => {
  const [userIdcookies, setUserIdCookie] = useCookies(["userId"]);
  const [newUserCookies, setNewUserCookie] = useCookies(["newUser"]);

  useEffect(() => {
    if (userIdcookies.userId === undefined) {
      setUserIdCookie("userId", uuidv4(), { path: "/" });
      setNewUserCookie("newUser", true, { path: "/" });
    }
  });

  const touch = !matchMedia("(pointer:fine)").matches;

  return (
    <Router>
      <div>
        <Route
          exact
          path="/"
          render={props => <Home {...props} userId={userIdcookies.userId} />}
        />
        <Route path="/random" render={props => <GetRandomGame {...props} />} />
        <Route
          path="/instructions"
          render={props => <Instructions {...props} isTouch={touch} />}
        />
        <Route path="/admin" component={Admin} />
        <Route
          path="/play/:id"
          render={props => (
            <Play
              {...props}
              userId={userIdcookies.userId}
              newUser={newUserCookies.newUser}
              isTouch={touch}
            />
          )}
        />
        <Route
          path="/results/game/:id"
          render={props => <Play {...props} userId={userIdcookies.userId} />}
        />
        <Route path="/snip-results/:id" component={VisualizeSnippet} />
        <Route path="/game-results/:id" component={VisualizeGame} />
      </div>
    </Router>
  );
};

export default App;
