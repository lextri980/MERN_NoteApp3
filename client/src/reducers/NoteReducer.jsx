import {
  NOTE_LOADED_SUCCESS,
  NOTE_LOADED_FAIL,
  CREATE_NOTE,
  UPDATE_NOTE,
  FIND_NOTE,
  DELETE_NOTE,
} from "../contexts/constants";

export const NoteReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case NOTE_LOADED_SUCCESS:
      return {
        ...state,
        notes: payload,
        noteLoading: false,
      };

    case NOTE_LOADED_FAIL:
      return {
        ...state,
        notes: [],
        noteLoading: false,
      };

    case CREATE_NOTE:
      return {
        ...state,
        notes: [...state.notes, payload],
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== payload),
      };

    case FIND_NOTE:
      return {
        ...state,
        note: payload,
      };

    case UPDATE_NOTE:
      const newNote = state.notes.map((note) =>
        note._id === payload._id ? payload : note
      );
      return {
        ...state,
        notes: newNote,
      };

    default:
      return state;
  }
};
