import React, {useEffect} from 'react';
import {useDraggable, useDroppable} from '@dnd-kit/core';
import {Button, List, Menu} from 'antd';

export function Draggable(props) {


  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });

  const {isOver, setNodeRef: droppable} = useDroppable({
    id: props.id,
  });

  useEffect(() => {
    if (isOver) {
      props.over(props.id);
    }
  }, [isOver]);

  const style = {
    transform: transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    display: 'block',
    width: '100%',
  };

  return (
    <Menu.Item type='text' key={props.key} ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <div ref={droppable}>
        {props.children}
      </div>
    </Menu.Item>
  );
}
