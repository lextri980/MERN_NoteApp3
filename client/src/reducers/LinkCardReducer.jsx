import {
  LINKCARD_LOADED_SUCCESS,
  LINKCARD_LOADED_FAIL,
  CREATE_LINKCARD,
  FIND_LINKCARD,
  UPDATE_LINKCARD,
  DELETE_LINKCARD,
} from "../contexts/constants";

export const LinkCardReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LINKCARD_LOADED_SUCCESS:
      return {
        ...state,
        linkcards: payload,
        linkcardsLoading: false,
      };

    case LINKCARD_LOADED_FAIL:
      return {
        ...state,
        linkcards: [],
        linkcardsLoading: false,
      };

    case CREATE_LINKCARD:
      return {
        ...state,
        linkcards: [...state.linkcards, payload],
      };

    case DELETE_LINKCARD:
      return {
        ...state,
        linkcards: state.linkcards.filter(
          (linkcard) => linkcard._id !== payload
        ),
      };

    case FIND_LINKCARD:
      return {
        ...state,
        linkcard: payload,
      };

    case UPDATE_LINKCARD:
      const newLinkcard = state.linkcards.map((linkcard) =>
        linkcard._id === payload._id ? payload : linkcard
      );
      return {
        ...state,
        linkcards: newLinkcard,
      };

    default:
      return state;
  }
};
