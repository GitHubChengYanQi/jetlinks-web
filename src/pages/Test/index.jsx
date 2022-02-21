import React from 'react';
import {Sortable} from '@/components/Table/components/DndKit/Sortable';

const App = () => {

  return <Sortable handle items={[
    {
      title: '字段1',
      key: 'key1',
      visible: true,
      checked: true,
    }, {
      title: '字段2',
      key: 'key2',
      visible: false,
      checked: true,
    }, {
      title: '字段3',
      key: 'key3',
      visible: false,
      checked: true,
    }, {
      title: '字段4',
      key: 'key4',
      visible: false,
      checked: true,
    }, {
      title: '字段5',
      key: 'key5',
      visible: false,
      checked: true,
    }
  ]} />;
};

export default App;
