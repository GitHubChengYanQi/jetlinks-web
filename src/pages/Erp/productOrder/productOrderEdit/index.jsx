/**
 * 产品订单编辑页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React, {useRef} from 'react';
import {Button, Col, Input, Row} from 'antd';
import Form from '@/components/Form';
import {productOrderDetail, productOrderAdd, productOrderEdit} from '../productOrderUrl';
import * as SysField from '../productOrderField';
import ProCard from '@ant-design/pro-card';
import {InternalFieldList as FieldList} from '@formily/antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import OrderSpus from '@/pages/Erp/productOrder/components/OrderSpus';
import CustomerAll from '@/pages/Crm/contract/components/CustomerAll';

const {FormItem} = Form;

const ApiConfig = {
  view: productOrderDetail,
  add: productOrderAdd,
  save: productOrderEdit
};

const ProductOrderEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="productOrderId"
      >
        <ProCard className="h2Card" headerBordered title="订单信息">
          <CustomerAll style={{width: 200}} />
        </ProCard>
        <ProCard className="h2Card" headerBordered title="产品信息">
          <FieldList
            name="orderDetail"
            initialValue={[{}]}
          >
            {({state, mutators}) => {
              const onAdd = () => mutators.push();
              return (
                <div>
                  {state.value.map((item, index) => {
                    const onRemove = index => mutators.remove(index);
                    return (
                      <div key={index}>

                        <OrderSpus index={index} />

                        <Button
                          type="link"
                          style={{float: 'right', display: state.value.length === 1 && 'none'}}
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            onRemove(index);
                          }}
                          danger
                        />
                      </div>
                    );
                  })}
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={onAdd}>增加物料</Button>
                </div>
              );
            }}
          </FieldList>
        </ProCard>
      </Form>
    </div>
  );
};

export default ProductOrderEdit;
