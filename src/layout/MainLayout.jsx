import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
