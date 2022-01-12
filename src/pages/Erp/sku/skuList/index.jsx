import React, { useState} from 'react';
import { Spin, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import {useRequest} from '@/util/Request';
import Select from '@/components/Select';
import {spuClassificationTreeVrew} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';
import SkuTable from '@/pages/Erp/sku/SkuTable';
import {spuClassificationListSelect} from '@/pages/Erp/spu/spuUrl';


const SkuList = () => {

  const {loading, data, run} = useRequest({
    ...spuClassificationTreeVrew, data: {
      isNotproduct: 1
    }
  });

  const array = data ? data.map((items)=>{
    return {
      value:items.value,
      label:items.label,
    };
  }) : [];

  const [spuClass, setSpuClass] = useState();

  const [value, setValue] = useState();


  const Left = () => {
    if (loading) {
      return (<div style={{textAlign: 'center', marginTop: 50}}><Spin size="large" /></div>);
    }
    return (
      <>
        <div>
          <Select
            width="100%"
            api={spuClassificationListSelect}
            placeholder="搜索分类"
            value={value}
            bordered={false}
            onChange={async (value) => {
              await run(
                {
                  data: {
                    spuClassificationId: value
                  }
                }
              );
              setValue(value);
            }} />
        </div>
        <Tree
          showLine
          onSelect={(value) => {
            setSpuClass(value);
          }}
          defaultExpandedKeys={['']}
          treeData={[
            {
              label: '所有分类',
              value: '',
              children: array
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

