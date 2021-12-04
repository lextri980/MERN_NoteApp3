import React, { createContext, useReducer, useState } from "react";
import { LinkCardReducer } from "../reducers/LinkCardReducer";
import {
  url,
  LINKCARD_LOADED_SUCCESS,
  LINKCARD_LOADED_FAIL,
  CREATE_LINKCARD,
  FIND_LINKCARD,
  UPDATE_LINKCARD,
  DELETE_LINKCARD,
} from "./constants";
import axios from "axios";

export const LinkCardContext = createContext();

function LinkCardContextProvider({ children }) {
  const [linkCardState, dispatch] = useReducer(LinkCardReducer, {
    linkcardsLoading: true,
    linkcards: [],
    linkcard: null,
  });

  //Layout State
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: null,
    message: "",
  });

  //Get linkCards
  const getLinkCard = async () => {
    try {
      const response = await axios.get(`${url}/linkcard`);
      if (response.data.success) {
        dispatch({
          type: LINKCARD_LOADED_SUCCESS,
          payload: response.data.linkcards,
        });
      }
    } catch (error) {
      return dispatch({
        type: LINKCARD_LOADED_FAIL,
      });
    }
  };

  //Create linkcard
  const createLinkCard = async (newLinkcard) => {
    try {
      const response = await axios.post(`${url}/linkcard`, newLinkcard);
      if (response.data.success) {
        dispatch({
          type: CREATE_LINKCARD,
          payload: response.data.linkcard,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Internal server error" };
    }
  };

  //Delete linkcard
  const deleteLinkCard = async (linkcardId) => {
    try {
      const response = await axios.delete(`${url}/linkcard/${linkcardId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_LINKCARD,
          payload: linkcardId,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Internal server error" };
    }
  };

  //Find Linkcard
  const findLinkCard = (linkcardId) => {
    const linkcard = linkCardState.linkcards.find(
      (linkcard) => linkcard._id === linkcardId
    );
    dispatch({
      type: FIND_LINKCARD,
      payload: linkcard
    })
  };

  //Update Linkcard
  const updateLinkCard = async (updatedLinkcard) => {
    try {
      const response = await axios.put(
        `${url}/linkcard/${updatedLinkcard._id}`,
        updatedLinkcard
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_LINKCARD,
          payload: response.data.linkcard,
        });
        return response.data
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Internal server error" };
    }
  };

  //Context data
  const LinkCardContextData = {
    linkCardState,
    getLinkCard,
    createLinkCard,
    deleteLinkCard,
    findLinkCard,
    updateLinkCard,
    addModal,
    setAddModal,
    updateModal,
    setUpdateModal,
    toast,
    setToast,
  };

  return (
    <LinkCardContext.Provider value={LinkCardContextData}>
      {children}
    </LinkCardContext.Provider>
  );
}

export default LinkCardContextProvider;
