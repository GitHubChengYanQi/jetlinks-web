import React, {useState} from 'react';
import {Divider, Tree} from 'antd';
import SpeechcraftTable from '@/pages/Crm/speechcraft/components/SpeechcraftTable';
import SpeechcraftSelect from '@/pages/Crm/speechcraft/components/SpeechcraftSelect';
import ListLayout from '@/layouts/ListLayout';


const SpeechcraftList = () => {


  const [state, setState] = useState('0');


  const Left = () => {
    return (
      <>
        <Tree
          onSelect={(value) => {
            setState(value[0]);
          }}
          showLine
          // switcherIcon={<DownOutlined />}
          // defaultExpandedKeys={['1']}
          defaultSelectedKeys={['0']}
          // defaultCheckedKeys={['1']}
          // onSelect={this.onSelect}
          treeData={[
            {
              title: '快速查询话术',
              key: '0',
              children: [],
            }, {
              title: '话术管理',
              key: '1',
              children: [],
            },
          ]}
        />
        <Divider />
      </>);
  };
  return (
    <ListLayout left={Left()}>
      {state === '1' ? <SpeechcraftTable /> : <SpeechcraftSelect />}
    </ListLayout>
  );
};
export default SpeechcraftList;
