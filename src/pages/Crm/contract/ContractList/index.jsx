import React, {useState} from 'react';
import CustomerTable from '@/pages/Crm/customer/components/CustomerTable';
import {Divider, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import {useRequest} from '@/util/Request';
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
                  title: '通过',
                  key: '1',
                },
                {
                  title: '未通过',
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
