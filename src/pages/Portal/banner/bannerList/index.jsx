import React, {useState} from 'react';
import CustomerTable from '@/pages/Crm/customer/components/CustomerTable';
import {Divider, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import {useRequest} from '@/util/Request';
import ContractTable from '@/pages/Crm/contract/ContractList/components/ContractTable';
import BannerTable from '@/pages/Portal/banner/components/BannerTable';


const BannerList = () => {

  const {loading, data,run} = useRequest({url: '/bannerDifference/list', method: 'POST', rowKey: 'classificationId'});

  const classification = data ? data.map((values) => {
    return {
      title: values.difference,
      key: values.classificationId,
    };
  }) : [];

  const [state, setState] = useState();

  const Left = () => {
    return (
      <>
        <Tree
          onSelect={(value) => {
            setState(value);
          }}
          showLine
          defaultExpandedKeys={[' ']}
          treeData={[
            {
              title: '所有分类',
              key: ' ',
              children: classification
            },
          ]}
        />
        <Divider />
      </>);
  };
  return (
    <ListLayout left={Left()}>
      <BannerTable state={state}  />
    </ListLayout>
  );
};
export default BannerList;
