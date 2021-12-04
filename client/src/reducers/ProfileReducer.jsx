import { FIND_PROFILE, UPDATE_PROFILE } from "../contexts/constants";

export const ProfileRuducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FIND_PROFILE:
      return {
        ...state,
        note: payload,
      };

    case UPDATE_PROFILE:
      const newProfile = state.profiles.map((profile) =>
        profile._id === payload._id ? payload : profile
      );
      return {
        ...state,
        notes: newProfile,
      };

    default:
      return state;
  }
};
