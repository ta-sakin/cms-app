import React from "react";
import "./SlideDrawer.css";

const SlideDrawer = ({ show }) => {
  let drawerClasses = show ? "side-drawer open" : "side-drawer";

  return (
    <div className={drawerClasses}>
      <h1 className="mt-20">Hello, I'm a drawer!</h1>
    </div>
  );
};

export default SlideDrawer;
