import React, { useState } from "react";

export const DAOProfileDataContext = React.createContext();

const DAOProfileDataState = ({ children }) => {
  const [daoProfileData, setDAOProfileData] = useState([{}]);

  return (
    <DAOProfileDataContext.Provider value={[daoProfileData, setDAOProfileData]}>
      {children}
    </DAOProfileDataContext.Provider>
  );
};

export default DAOProfileDataState;
