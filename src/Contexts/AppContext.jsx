import React, { useReducer } from "react";
import { AppContext } from "..";

function AppContextProvider({ children }) {
  const reducerFunction = (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  const initialValue = {};
  const [state, dispatch] = useReducer(reducerFunction, initialValue);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
