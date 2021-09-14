import React, {useState} from 'react';
import {Divider, Tree} from 'antd';
import SpeechcraftTable from '@/pages/Crm/speechcraft/components/SpeechcraftTable';
import SpeechcraftSelect from '@/pages/Crm/speechcraft/components/SpeechcraftSelect';
import ListLayout from '@/layouts/ListLayout';
import {useRequest} from '@/util/Request';
import {speechcraftType} from '@/pages/Crm/speechcraft/speechcraftUrl';


const SpeechcraftList = () => {


  const [state, setState] = useState('0');
  const [type, setType] = useState();


  const {data} = useRequest(speechcraftType);

  const speechcraftTypes = data ? data.length > 0 && data.map((items, index) => {
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
          // switcherIcon={<DownOutlined />}
          // defaultExpandedKeys={['1']}
          defaultSelectedKeys={['0']}
          // defaultCheckedKeys={['1']}
          // onSelect={this.onSelect}
          defaultExpandAll
          treeData={[
            {
              title: '快速查询话术',
              key: '0',
              children: [],
            }, {
              title: '话术管理',
              key: '1',
              children: [
                {
                  title: '话术分类',
                  key: '1-1',
                  children: speechcraftTypes
                }
              ],
            },
          ]}
        />
        <Divider />
      </>);
  };
  return (
    <ListLayout left={Left()}>
      {state === '0' ? <SpeechcraftSelect /> : <SpeechcraftTable type={type} />}
    </ListLayout>
  );
};
export default SpeechcraftList;
