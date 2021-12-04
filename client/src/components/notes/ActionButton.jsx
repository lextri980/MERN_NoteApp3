import React, { useContext } from "react";
import { NoteContext } from "../../contexts/NoteContext";
import { Button } from "react-bootstrap";
import updateIcon from "../../assets/icon/update.png";
import deleteIcon from "../../assets/icon/delete.png";

function ActionButton({ _id }) {
  const { deleteNote, findNote, setUpdateModal } = useContext(NoteContext);
  const chooseNote = (linkcardId) => {
    findNote(linkcardId);
    setUpdateModal(true)
  };

  return (
    <>
      <Button className="post-button" onClick={chooseNote.bind(this, _id)}>
        <img src={updateIcon} alt="update" width="20" height="20" />
      </Button>
      <Button className="post-button" onClick={deleteNote.bind(this, _id)}>
        <img src={deleteIcon} alt="delete" width="20" height="20" />
      </Button>
    </>
  );
}

export default ActionButton;

