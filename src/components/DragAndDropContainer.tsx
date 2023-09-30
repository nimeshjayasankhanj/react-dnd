// components/DragAndDropContainer.tsx
import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import List from "./List";

const DragAndDropContainer = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <List />
    </DndProvider>
  );
};

export default DragAndDropContainer;
