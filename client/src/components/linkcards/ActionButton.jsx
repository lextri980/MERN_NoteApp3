import React, { useContext } from "react";
import { LinkCardContext } from "../../contexts/LinkCardContext";
import { Button } from "react-bootstrap";
// import { SweetAlert } from "react-bootstrap-sweetalert";
import playIcon from "../../assets/icon/play.png";
import updateIcon from "../../assets/icon/update.png";
import deleteIcon from "../../assets/icon/delete.png";

function ActionButton({ url, _id }) {
  const { deleteLinkCard, findLinkCard, setUpdateModal } = useContext(LinkCardContext);
  const chooseLinkcard = (linkcardId) => {
    findLinkCard(linkcardId);
    setUpdateModal(true)
  };

  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="20" height="20" />
      </Button>
      <Button className="post-button" onClick={chooseLinkcard.bind(this, _id)}>
        <img src={updateIcon} alt="update" width="20" height="20" />
      </Button>
      <Button className="post-button" onClick={deleteLinkCard.bind(this, _id)}>
        <img src={deleteIcon} alt="delete" width="20" height="20" />
      </Button>
    </>
  );
}

export default ActionButton;
