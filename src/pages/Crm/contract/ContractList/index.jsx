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
              title: '审核状态',
              key: '',
              children: [
                {
                  title: '合格',
                  key: '1',
                },
                {
                  title: '不合格',
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
