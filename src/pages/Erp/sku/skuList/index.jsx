import React, {useState} from 'react';
import {Spin, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import {useRequest} from '@/util/Request';
import {spuClassificationTreeVrew} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';
import SkuTable from '@/pages/Erp/sku/SkuTable';


const SkuList = () => {

  const {loading, data} = useRequest({
    ...spuClassificationTreeVrew, data: {
      isNotproduct: 1
    }
  });

  const dataResult = (items) => {
    if (!Array.isArray(items)) {
      return [];
    }
    return items.map((item) => {
      return {
        key: item.value,
        title: item.label,
        children: dataResult(item.children),
      };
    });
  };

  const dataSource = dataResult(data);

  const [spuClass, setSpuClass] = useState();

  const Left = () => {
    if (loading) {
      return (<div style={{textAlign: 'center', marginTop: 50}}><Spin size="large" /></div>);
    }
    return (
      <>
        <Tree
          showLine
          onSelect={(value) => {
            setSpuClass(value);
          }}
          defaultExpandedKeys={['']}
          treeData={[
            {
              title: '所有分类',
              key: '',
              children: dataSource
            },
          ]}
        />
      </>);
  };
  return (
    <ListLayout>
      <SkuTable left={Left()} spuClass={spuClass} />
    </ListLayout>
  );
};
export default SkuList;

