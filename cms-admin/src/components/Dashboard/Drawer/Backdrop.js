import React from "react";
import "./Backdrop.css";

const BackDrop = ({ closeDrawer }) => {
  return <div className="backdrop" onClick={closeDrawer}></div>;
};

export default BackDrop;
