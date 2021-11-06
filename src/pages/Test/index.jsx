import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';


import {Draggable} from './Draggable';
import {Col, Row} from 'antd';
import {CheckOutlined, UnorderedListOutlined} from '@ant-design/icons';

const App = () => {

  const [parent, setParent] = useState(['111', '222', '333', '444', '555', '666', '777']);

  const [overId, setOverId] = useState();


  const over = (event) => {

    const {active} = event;

    console.log('end:', active.id, 'over:', overId);

    const menu = [];

    parent.map((items, index) => {
      if (items === active.id) {
        return menu[index] = overId;
      } else if (items === overId) {
        return menu[index] = active.id;
      } else {
        return menu[index] = items;
      }
    });

    console.log(menu);
    setParent(menu);
  };

  const menus = () => {
    return parent.map((id) => {
      return <Draggable key={id} id={id} over={(value) => {
        setOverId(value);
      }}>
        <div style={{fontSize:50}}>
          <UnorderedListOutlined />
          &nbsp;
          {id}
          <span style={{float: 'right'}}><CheckOutlined /></span>
        </div>
      </Draggable>;
    });
  };

  return (
    <div style={{margin: 'auto', width: 800}}>
      <DndContext onDragEnd={(value) => {
        over(value);
      }}>
        {menus()}
      </DndContext>
    </div>
  );

};

export default App;
