import React from "react";
import ReactDOM from "react-dom";

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>{props.info}</p>
    <p></p>
  </div>
);

const requiteAuthentication = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated && <p>some private details</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const AuthInfo = requiteAuthentication(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="there are details" />,
  document.getElementById("app")
);
