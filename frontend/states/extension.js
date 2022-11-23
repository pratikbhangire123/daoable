import React, { useState } from "react";

const initialState = false;

export const ExtensionContext = React.createContext();

const ExtensionState = ({ children }) => {
  const [isConnectedWithExtension, setIsConnectedWithExtension] =
    useState(initialState);

  return (
    <ExtensionContext.Provider
      value={[isConnectedWithExtension, setIsConnectedWithExtension]}
    >
      {children}
    </ExtensionContext.Provider>
  );
};

export default ExtensionState;
