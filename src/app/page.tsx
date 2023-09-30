"use client";
// pages/index.tsx
import React from "react";
import DragAndDropContainer from "../components/DragAndDropContainer";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Multi-List Drag and Drop</h1>
      <DragAndDropContainer />
    </div>
  );
};

export default Home;
