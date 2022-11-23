import React, { useEffect, useState } from "react";

const initialState = false;

export const ProfileContext = React.createContext();

const ProfileState = ({ children }) => {
  const [profileConnected, setProfileConnected] = useState(initialState);

  useEffect(() => {
    const currentProfileConnected =
      window.localStorage.getItem("profileConnected");
    if (currentProfileConnected !== null) {
      setProfileConnected(JSON.parse(currentProfileConnected));
    }
  }, []);

  useEffect(() => {
    if (profileConnected !== initialState) {
      window.localStorage.setItem(
        "profileConnected",
        JSON.stringify(profileConnected)
      );
    }
  }, [profileConnected]);

  return (
    <ProfileContext.Provider value={[profileConnected, setProfileConnected]}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
