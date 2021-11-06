import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {CheckOutlined, UnorderedListOutlined} from '@ant-design/icons';
import {Draggable} from '../Draggable/index';
import {Menu} from 'antd';

export const Menus = ({column}) => {

  const [tableColumn, setTableColumn] = useState(column);

  const [overId, setOverId] = useState();


  const over = (item) => {

    console.log(item, overId);

    if (item && overId) {
      const menu = [];
      tableColumn.map((items, index) => {
        if (items.key === item.key) {
          return menu[index] = overId;
        } else if (items.key === overId.key) {
          return menu[index] = item;
        } else {
          return menu[index] = items;
        }
      });
      setTableColumn(menu);
    }
  };


  const menus = () => {
    return tableColumn.map((items, index) => {
      if (items.key) {
        return <Draggable key={index} menuKey={index} id={items} over={(value) => {
          setOverId(value);
        }}>
          <UnorderedListOutlined />
          &nbsp;
          {items.props.title}
          <span style={{float: 'right'}}><CheckOutlined /></span>
        </Draggable>;
      } else {
        return null;
      }

    });
  };

  return (
    <div style={{margin: 'auto', width: 800, backgroundColor: '#fff'}}>
      <DndContext onDragEnd={(value) => {
        // over(value.active.id);
      }}>
        <Menu>
          <Draggable key={1} menuKey={1} id={1} over={(value) => {
            setOverId(value);
          }}>
            <UnorderedListOutlined />
            &nbsp;
            1
            <span style={{float: 'right'}}><CheckOutlined /></span>
          </Draggable>
          <Draggable key={2} menuKey={2} id={2} over={(value) => {
            setOverId(value);
          }}>
            <UnorderedListOutlined />
            &nbsp;
            2
            <span style={{float: 'right'}}><CheckOutlined /></span>
          </Draggable>

        </Menu>
      </DndContext>
    </div>
  );

};

