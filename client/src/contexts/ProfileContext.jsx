import axios from "axios";
import React, { createContext, useReducer, useState } from "react";
import { ProfileRuducer } from "../reducers/ProfileReducer";
import { url, FIND_PROFILE, UPDATE_PROFILE } from "./constants";

export const ProfileContext = createContext();

function ProfileContextProvider({ children }) {
  const { profileState, dispatch } = useReducer(ProfileRuducer, {
    profileLoading: true,
    profile: null,
  });

  //Layout State
  const [updateModal, setUpdateModal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: null,
    message: "",
  });

  //Find Profile
  const findProfile = (profileId) => {
    const profile = profileState.profiles.find(
      (profile) => profile._id === profileId
    );
    dispatch({
      type: FIND_PROFILE,
      payload: profile,
    });
  };

  //Update Profile
  const updateProfile = async (updatedProfile) => {
    try {
      const response = await axios.put(
        `${url}/profile/${updatedProfile._id}`,
        updatedProfile
      );
      console.log(response);
      if (response.data.success) {
        dispatch({
          type: UPDATE_PROFILE,
          payload: response.data.profile,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Internal server error" };
    }
  };

  const ProfileContextData = {
    profileState,
    findProfile,
    updateProfile,
    updateModal,
    setUpdateModal,
    toast,
    setToast,
  };

  return (
    <ProfileContext.Provider value={ProfileContextData}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileContextProvider;
