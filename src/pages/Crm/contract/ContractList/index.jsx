import React, {useState} from 'react';
import {Divider, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import ContractTable from '@/pages/Crm/contract/ContractList/components/ContractTable';


const ContractList = () => {

  const [state, setState] = useState();

  const Left = () => {
    return (
      <>
        <Tree
          onSelect={(value) => {
            setState(value);
          }}
          showLine
          defaultExpandedKeys={['']}
          treeData={[
            {
              title: '所有审核',
              key: '',
              children: [
                {
                  title: '已审核',
                  key: '1',
                },
                {
                  title: '未审核',
                  key: '0',
                },
              ],
            },
          ]}
        />
        <Divider />
      </>);
  };
  return (
    <ListLayout left={Left()}>
      <ContractTable state={state}  />
    </ListLayout>
  );
};
export default ContractList;
