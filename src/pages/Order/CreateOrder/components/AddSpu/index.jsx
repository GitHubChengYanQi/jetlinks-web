import React from 'react';
import {Form, Spin} from 'antd';
import Cascader from '@/components/Cascader';
import {spuClassificationTreeVrew} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';
import {useRequest} from '@/util/Request';
import {spuListSelect} from '@/pages/Erp/parts/PartsUrl';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import Select from '@/components/Select';

const AddSpu = () => {

  const {loading: spuLoading, data: spuData, run: spuRun} = useRequest(spuListSelect, {manual: true});

  const {loading: detailLoading, data: detailData, run: detailRun} = useRequest(spuDetail, {manual: true});
  console.log(detailData);

  return <div style={{padding: '24px 20%'}}>
    <Form>
      <Form.Item name="class" label="选择分类">
        <Cascader api={spuClassificationTreeVrew} onChange={(value) => {
          spuRun({
            data: {
              spuClassificationId: value,
            }
          });
        }} />
      </Form.Item>
      <Form.Item label="选择产品">
        {spuLoading ? <Spin /> : <Select options={spuData || []} onChange={(value) => {
          detailRun({
            data: {
              spuId: value,
            }
          });
        }} />}
      </Form.Item>
    </Form>
  </div>;
};

export default AddSpu;
