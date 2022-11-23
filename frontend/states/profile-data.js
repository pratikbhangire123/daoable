import React, { useEffect, useState } from "react";

const initialState = null;

export const ProfileDataContext = React.createContext();

const ProfileDataState = ({ children }) => {
  const [profileData, setProfileData] = useState(initialState);

  useEffect(() => {
    const currentProfileData = window.localStorage.getItem("profileData");
    if (currentProfileData !== null) {
      setProfileData(JSON.parse(currentProfileData));
    }
  }, []);

  useEffect(() => {
    if (profileData !== initialState) {
      window.localStorage.setItem("profileData", JSON.stringify(profileData));
    } 
  }, [profileData]);

  return (
    <ProfileDataContext.Provider value={[profileData, setProfileData]}>
      {children}
    </ProfileDataContext.Provider>
  );
};

export default ProfileDataState;
