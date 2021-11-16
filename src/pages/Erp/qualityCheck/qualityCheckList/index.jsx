import React, {useState} from 'react';
import {Divider, Menu, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import QualityTable from '@/pages/Erp/qualityCheck/components/QualityTable';
import QualityPlanList from '@/pages/Erp/qualityCheck/components/qualityPlan/qualityPlanList';
import QualityTaskList from '@/pages/Erp/qualityCheck/components/qualityTask/qualityTaskList';


const QualityCheckList = () => {

  const [state, setState] = useState('1');

  const Left = () => {
    return (
      <>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          onSelect={(value) => {
            setState(value.key);
          }}
        >
          <Menu.Item key="1">
            质检项
          </Menu.Item>
          <Menu.Item key="2">
            质检方案
          </Menu.Item>
          <Menu.Item key="3">
            质检任务
          </Menu.Item>
        </Menu>
        <Divider />
      </>);
  };

  const module = () => {
    switch (state) {
      case '1':
        return <QualityTable />;
      case '2':
        return <QualityPlanList />;
      case '3':
        return <QualityTaskList />;
      default:
        break;
    }
  };

  return (
    <ListLayout left={Left()}>
      {module()}
    </ListLayout>
  );
};
export default QualityCheckList;
