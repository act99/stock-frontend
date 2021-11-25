import { useQuery, useReactiveVar } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { isLoggedInVar } from "./apollo";
import { LoginRouter } from "./routers/login-router";
import { LogoutRouter } from "./routers/logout-router";

//isLoggedIn => for local storage

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoginRouter /> : <LogoutRouter />;
}

export default App;
