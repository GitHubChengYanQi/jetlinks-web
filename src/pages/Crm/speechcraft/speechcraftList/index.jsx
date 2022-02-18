import React, {useState} from 'react';
import {Divider, Spin, Tree} from 'antd';
import SpeechcraftTable from '@/pages/Crm/speechcraft/components/SpeechcraftTable';
import SpeechcraftSelect from '@/pages/Crm/speechcraft/components/SpeechcraftSelect';
import ListLayout from '@/layouts/ListLayout';
import store from '@/store';


const SpeechcraftList = () => {


  const [state, setState] = useState('0');
  const [type, setType] = useState();

  const [data] = store.useModel('dataSource');

  const speechcraftTypes = (data && data.speechcraftClass) ? data.speechcraftClass.map((items) => {
    return {
      title: items.label,
      key: items.value
    };
  }) : [];


  const Left = () => {
    return (
      <>
        <Tree
          onSelect={(value) => {
            setState(value[0]);
            if (value[0] !== '0' && value[0] !== '1' && value[0] !== '1-1')
              setType(value[0]);
          }}
          showLine
          defaultSelectedKeys={[state]}
          defaultExpandAll
          treeData={[
            {
              title: '快速查询话术',
              key: '0',
              children: [],
            }, {
              title: '话术管理',
              key: '1',
              children: speechcraftTypes,
            },
          ]}
        />
        <Divider />
      </>);
  };
  return (
    <ListLayout left={state === '0' && Left()}>
      {state === '0' ? <SpeechcraftSelect /> : <SpeechcraftTable left={Left()} type={type} />}
    </ListLayout>
  );
};
export default SpeechcraftList;
