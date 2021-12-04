import React, { createContext, useReducer, useState } from "react";
import { NoteReducer } from "../reducers/NoteReducer";
import {
  url,
  NOTE_LOADED_SUCCESS,
  NOTE_LOADED_FAIL,
  CREATE_NOTE,
  UPDATE_NOTE,
  FIND_NOTE,
  DELETE_NOTE,
} from "./constants";
import axios from "axios";

export const NoteContext = createContext();

function NoteContextProvider({ children }) {
  const [noteState, dispatch] = useReducer(NoteReducer, {
    noteLoading: true,
    notes: [],
    note: null,
  });

  //Layout State
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: null,
    message: "",
  });

  //Get Notes
  const getNote = async () => {
    try {
      const response = await axios.get(`${url}/note`);
      if (response.data.success) {
        console.log(response);
        dispatch({
          type: NOTE_LOADED_SUCCESS,
          payload: response.data.notes,
        });
      }
    } catch (error) {
      return dispatch({
        type: NOTE_LOADED_FAIL,
      });
    }
  };

  //Create Note
  const createNote = async (newNote) => {
    try {
      const response = await axios.post(`${url}/note`, newNote);
      if (response.data.success) {
        dispatch({
          type: CREATE_NOTE,
          payload: response.data.note,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Internal server error" };
    }
  };

  //Delete Note
  const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(`${url}/note/${noteId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_NOTE,
          payload: noteId,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Internal server error" };
    }
  };

  //Find Note
  const findNote = (noteId) => {
    const note = noteState.notes.find(
      note => note._id === noteId
    )
    dispatch({
      type: FIND_NOTE,
      payload: note
    })
  }

  //Update Note
  const updateNote = async (updatedNote) => {
    try {
      const response = await axios.put(`${url}/note/${updatedNote._id}`, updatedNote)
      if(response.data.success) {
        dispatch({
          type: UPDATE_NOTE,
          payload: response.data.note
        })
        return response.data
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Internal server error" };
    }
  }

  const NoteContextData = {
    noteState,
    getNote,
    createNote,
    deleteNote,
    findNote,
    updateNote,
    addModal,
    setAddModal,
    updateModal,
    setUpdateModal,
    toast,
    setToast,
  };

  return (
    <NoteContext.Provider value={NoteContextData}>
      {children}
    </NoteContext.Provider>
  );
}

export default NoteContextProvider;
