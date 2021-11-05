import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from '@/pages/Erp/Test/Draggable';
import {Droppable} from '@/pages/Erp/Test/Droppable';


const App = () => {

  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <Droppable>
        {isDropped ? draggableMarkup : 'Drop here'}
      </Droppable>
    </DndContext>
  );

  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }
};
export default App;
