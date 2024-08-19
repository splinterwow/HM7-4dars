import React from "react";
import Header from "../components/Header";
function MainLayout({ children }) {
  //children sfatida ichidagi bola kelyabdi
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default MainLayout;
