import React from "react";

const Plop = ({ name, children }) => (
  <>
    <h1>I'm {name}</h1>
    {children}
  </>
);

export default Plop;
