import React, {useEffect} from 'react';
import {useDraggable, useDroppable} from '@dnd-kit/core';

export function Draggable(props) {

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });

  const {isOver, setNodeRef:droppable} = useDroppable({
    id: props.id,
  });

  useEffect(()=>{
    if (isOver){
      props.over(props.id);
    }
  },[isOver]);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;


  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div ref={droppable}>{props.children}</div>
    </div>
  );
}
