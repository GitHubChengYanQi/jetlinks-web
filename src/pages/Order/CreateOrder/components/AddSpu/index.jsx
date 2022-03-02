import React, {useState} from 'react';
import {Form, Radio, Space, Spin} from 'antd';
import Cascader from '@/components/Cascader';
import {spuClassificationTreeVrew} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';
import {useRequest} from '@/util/Request';
import {spuListSelect} from '@/pages/Erp/parts/PartsUrl';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import Select from '@/components/Select';

const AddSpu = () => {

  const [config, setConfig] = useState([]);

  const {loading: spuLoading, data: spuData, run: spuRun} = useRequest(spuListSelect, {manual: true});

  const {loading: detailLoading, data: detailData, run: detailRun} = useRequest(spuDetail,
    {
      manual: true,
      onSuccess: (res) => {
        setConfig(res && res.sku && res.sku.tree && res.sku.tree || []);
      }
    });

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
        {spuLoading ?
          <Spin />
          :
          <Select value={detailData && detailData.spuId} options={spuData || []} onChange={(value) => {
            detailRun({
              data: {
                spuId: value,
              }
            });
          }} />}
      </Form.Item>
      <Form.Item>
        {
          detailLoading
            ?
            <div style={{textAlign: 'center'}}>
              <Spin />
            </div>
            :
            config.map((item, index) => {
              return <div key={index} style={{padding: 8}}>
                <Space>
                  <div>
                    {item.k}：
                  </div>
                  <Radio.Group key={index}>
                    {
                      item.v.map((item, index) => {
                        return <Radio.Button
                          key={index}
                          style={{margin: '0 8px'}}
                          value={item.id}>
                          {item.name}
                        </Radio.Button>;
                      })
                    }
                  </Radio.Group>
                </Space>
              </div>;
            })
        }
      </Form.Item>
    </Form>
  </div>;
};

export default AddSpu;
