import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const routeError = useRouteError();

  console.log(routeError);

  return <div>ErrorPage</div>;
};

export default ErrorPage;
