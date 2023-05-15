import React from "react";
import ToolBar from "../Components/Toolbar";

export const Layout = ({ children }) => {
  return (
    <>
      <ToolBar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
