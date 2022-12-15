import React from "react";
import "./Backdrop.css";
import ReactDom from "react-dom";

const BackDrop = ({ closeDrawer }) => {
  return ReactDom.createPortal(
    <div className="backdrop" onClick={closeDrawer}></div>,
    document.getElementById("portal")
  );
};

export default BackDrop;
