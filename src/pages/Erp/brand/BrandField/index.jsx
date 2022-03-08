/**
 * 品牌表字段配置页
 *
 * @author
 * @Date 2021-07-14 14:19:04
 */

import React, {useRef} from 'react';
import {Button, Input, Space} from 'antd';
import ProCard from '@ant-design/pro-card';
import Modal from '@/components/Modal';
import CheckSku from '@/pages/Erp/sku/components/CheckSku';
import AddSkuTable from '@/pages/Erp/brand/components/AddSkuTable';

export const BrandName = (props) => {
  return (<Input {...props} />);
};
export const AddSku = ({
  value = [],
  onChange,
}) => {

  const ref = useRef();

  const addSkuRef = useRef();

  return (<>
    <ProCard
      style={{marginTop: 24}}
      bodyStyle={{padding: 16}}
      className="h2Card"
      title="物料列表"
      headerBordered
      extra={<Space>
        <Button onClick={() => {
          ref.current.open(true);
        }}>添加出库物料</Button>
      </Space>}
    >

      <AddSkuTable
        value={value}
        onChange={onChange}
      />
    </ProCard>

    <Modal
      ref={ref}
      width={1000}
      footer={<Space>
        <Button onClick={() => {
          const res = addSkuRef.current.check();
          onChange(res);
        }}>选中</Button>
        <Button type="primary" onClick={() => {
          const res = addSkuRef.current.change();
          onChange(res);
          ref.current.close();
        }}>选中并关闭</Button>
      </Space>}
    >
      <CheckSku
        noCreate
        value={value}
        ref={addSkuRef}
      />
    </Modal>
  </>);
};

