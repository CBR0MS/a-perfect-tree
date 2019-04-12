import React, { useState } from "react";
import { useCookies } from "react-cookie";

import { Redirect } from "react-router";
const queryString = require("query-string");

const Instructions = props => {
  const [redirect, setRedirect] = useState(undefined);
  const [cookies, setCookie] = useCookies(["newUser"]);

  setCookie("newUser", false, { path: "/" });

  const parsed = queryString.parse(props.location.search);
  const next = parsed.redirect ? `/play/${parsed.redirect}` : "/";
  console.log(cookies);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  let touchInstructs = <span />;

  if (props.isTouch) {
    touchInstructs = (
      <p>
        Since you are on mobile, please copy your selection and paste it in the
        input box below the text.
      </p>
    );
  }

  return (
    <div className="playWrapper padded">
      <h2>Instructions</h2>
      <div className="padder">
        <p>
          This survey aims to examine how people interpret meaning in text. You
          will be presented with a group of snippets of text from a common
          source.
        </p>
        <p>
          <b>
            For each snippet of text, determine which part you find{" "}
            <em>meaningful</em> and highlight it.
          </b>
        </p>
        {touchInstructs}
        <p>
          After submitting, you'll see how others interpreted the same passage
          of text.
        </p>
        <p>Thanks for your contribution!</p>
      </div>

      <button onClick={() => setRedirect(next)}>Get Started →</button>
    </div>
  );
};

export default Instructions;
