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
import {FormEffectHooks, FormPath, InternalFieldList as FieldList} from '@formily/antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import OrderSpus from '@/pages/Erp/productOrder/components/OrderSpus';
import CustomerAll from '@/pages/Crm/contract/components/CustomerAll';
import {useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: productOrderDetail,
  add: productOrderAdd,
  save: productOrderEdit
};

const { onFieldValueChange$ } = FormEffectHooks;

const ProductOrderEdit = ({...props}) => {

  const {run} = useRequest(spuDetail, {
    manual: true
  });

  const formRef = useRef();

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="productOrderId"
        effects={({ setFieldState }) => {
          onFieldValueChange$('orderDetail.*.spuId').subscribe(async (value) => {
            if (value.value){
              const data = await run({
                data: {
                  spuId: value.value
                }
              });

              if (data.attribute) {
                const attribute = JSON.parse(data.attribute);
                setFieldState(
                  FormPath.transform(value.name, /\d/, $1 => {
                    return `orderDetail.${$1}.sku`;
                  }),
                  state =>{
                    if (value.active){
                      state.props.select = value;
                    }
                    state.props.attribute = attribute;
                  }
                );
              }
            }

          });
        }}
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
