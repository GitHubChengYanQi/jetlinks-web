/**
 * 产品订单编辑页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React, {useRef} from 'react';
import {Button} from 'antd';
import Form from '@/components/Form';
import {productOrderDetail, productOrderAdd, productOrderEdit} from '../productOrderUrl';
import * as SysField from '../productOrderField';
import ProCard from '@ant-design/pro-card';
import {FormEffectHooks, FormPath, InternalFieldList as FieldList} from '@formily/antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import CustomerAll from '@/pages/Crm/contract/components/CustomerAll';
import {request, useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import SpuList from '@/pages/Erp/parts/components/SpuList';

const {FormItem} = Form;

const ApiConfig = {
  view: productOrderDetail,
  add: productOrderAdd,
  save: productOrderEdit
};

const {onFieldValueChange$} = FormEffectHooks;

const ProductOrderEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="productOrderId"
        effects={({setFieldState}) => {
          onFieldValueChange$('orderDetail.*.spuId').subscribe(async (value) => {
            if (value.value) {
              const data = await request({
                ...spuDetail,
                data: {
                  spuId: value.value
                }
              });

              setFieldState(
                FormPath.transform(value.name, /\d/, $1 => {
                  return `orderDetail.${$1}.sku`;
                }),
                state => {
                  if (value.active) {
                    state.props.select = value;
                  }
                  state.props.sku = data.sku;
                }
              );
            }

          });
        }}
      >
        <ProCard className="h2Card" headerBordered title="订单信息">
          <CustomerAll width={200} />
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

                        <SpuList
                          style={{display: 'inline-block', width: '30%'}}
                          spuName={`orderDetail.${index}.spuId`}
                          spuLabel="商品名称"
                          skuLabel="规格描述"
                          index={index}
                          skusName={`orderDetail.${index}.sku`} />

                        <div style={{display: 'inline-block', width: '18%'}}>
                          <FormItem
                            label="数量"
                            name={`orderDetail.${index}.number`}
                            component={SysField.Number}
                            required
                          />
                        </div>
                        <div style={{display: 'inline-block', width: '18%'}}>
                          <FormItem
                            label="金额"
                            name={`orderDetail.${index}.money`}
                            component={SysField.Money}
                            required
                          />
                        </div>

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
