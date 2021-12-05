import { SET_AUTH } from "../contexts/constants";

export const AuthReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;

  switch (type) {
    case SET_AUTH:
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };

    // case FIND_PROFILE:
    //   return {
    //     ...state,
    //     profiles: user,
    //   };

    // case UPDATE_PROFILE:
    //   const newProfile = user._id;
    //   // state.profiles.map((profile) =>
    //   //   profile._id === user._id ? user : profile
    //   return {
    //     ...state,
    //     profile: newProfile,
    //   };

    default:
      return state;
  }
};
