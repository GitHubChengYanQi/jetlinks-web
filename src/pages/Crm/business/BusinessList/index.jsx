import React, {useState} from 'react';
import {Divider, Tree} from 'antd';
import BusinessTable from '@/pages/Crm/business/components/BusinessTable';
import ListLayout from '@/layouts/ListLayout';
import store from '@/store';

const BusinessList = () => {

  const [dataState] = store.useModel('dataSource');
  console.log(dataState);

  const origin = (dataState && dataState.origin) ? dataState.origin.map((values) => {
    return {
      title: values.originName,
      key: values.originId,
    };
  }) : [];

  const businessSale = (dataState && dataState.businessSale) ? dataState && dataState.businessSale.map((values) => {
    return {
      title: values.label,
      key: values.value,
    };
  }) : [];

  const [status, setStatus] = useState();
  const [state, setState] = useState();
  const [statement, setStatement] = useState();

  const Left = () => {
    return (
      <div>
        <Tree
          showLine
          onSelect={(value) => {
            setStatement(value);
          }}
          // switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['']}
          // onSelect={this.onSelect}
          treeData={[
            {
              title: '所有完单',
              key: '',
              children: [
                {
                  title: '赢单',
                  key: '赢单'
                }, {
                  title: '输单',
                  key: '输单'
                },
              ],
            },
          ]}
        />
        <Divider />
        <Tree
          showLine
          onSelect={(value) => {
            setStatus(value);
          }}
          // switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['']}
          // onSelect={this.onSelect}
          treeData={[
            {
              title: '所有流程',
              key: '',
              children: businessSale,
            },
          ]}
        />
        <Divider />
        <Tree
          showLine
          onSelect={(value) => {
            setState(value);
          }}
          // switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['']}
          // onSelect={this.onSelect}
          treeData={[
            {
              title: '所有来源',
              key: '',
              children: origin,
            },
          ]}
        />
        <Divider />
      </div>
    );
  };


  return (
    <ListLayout>
      <BusinessTable left={Left()} status={status} state={state} statement={statement} />
    </ListLayout>
  );
};
export default BusinessList;
