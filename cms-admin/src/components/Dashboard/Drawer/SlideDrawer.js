import React from "react";
import "./SlideDrawer.css";
import ReactDom from "react-dom";
import { VscChromeClose } from "react-icons/vsc";
import PendingApproval from "../ManageComplains/PendingApproval";

const statusList = [
  "pending approval",
  "in verification",
  "in hold",
  "in hold",
  "in progress",
  "regected",
  "closed",
];

const SlideDrawer = ({ show, setDrawerOpen, complain }) => {
  let drawerClasses = show ? "side-drawer open" : "side-drawer";

  return ReactDom.createPortal(
    <div className={drawerClasses}>
      <div
        className="cursor-pointer"
        onClick={() => {
          setDrawerOpen(false);
        }}
      >
        <VscChromeClose className="text-2xl m-2 text-gray-500" />
      </div>
      <div className="mt-10">
        {complain.status !== "pending approval" && (
          <PendingApproval complain={complain} drawer={true} />
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default SlideDrawer;
