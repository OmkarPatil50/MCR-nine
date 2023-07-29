import React, { useContext } from "react";
import { AppContext } from "..";

function Landing() {
  const { state, dispatch } = useContext(AppContext);

  return <div>This is Landing </div>;
}

export default Landing;
