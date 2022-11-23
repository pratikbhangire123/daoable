import React, { useState } from "react";

const initialState = false;

export const WalletContext = React.createContext();

const WalletState = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(initialState);

  return (
    <WalletContext.Provider value={[walletConnected, setWalletConnected]}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletState;
