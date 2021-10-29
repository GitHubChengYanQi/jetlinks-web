import React, {useState} from 'react';
import {Divider, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import QualityTable from '@/pages/Erp/qualityCheck/components/QualityTable';
import QualityPlanList from '@/pages/Erp/qualityCheck/components/qualityPlan/qualityPlanList';


const QualityCheckList = () => {

  const [state, setState] = useState(['1']);

  const Left = () => {
    return (
      <>
        <Tree
          onSelect={(value) => {
            setState(value);
          }}
          showLine
          defaultSelectedKeys={['1']}
          treeData={[
            {
              title: '质检项',
              key: '1',
            },
            {
              title: '质检方案',
              key: '2',
            },
          ]}
        />
        <Divider />
      </>);
  };
  return (
    <ListLayout left={Left()}>
      {state[0] === '2' ? <QualityPlanList /> : <QualityTable />}
    </ListLayout>
  );
};
export default QualityCheckList;
