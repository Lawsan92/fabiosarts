import React, { useState } from 'react';
import { useRouteError } from "react-router-dom";


const Error = () => {
  const error = useRouteError();
  console.error('error:', error);

  return (
    <div className="error">
      <h1>Oops!</h1>
      <h1>ERROR 404</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );

}

export default Error;