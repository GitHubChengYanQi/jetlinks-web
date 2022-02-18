/**
 * 采购申请编辑页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React, {useImperativeHandle, useRef} from 'react';
import {Avatar, Button, Card, message, Popover, Space} from 'antd';
import ProCard from '@ant-design/pro-card';
import {
  FormEffectHooks,
  FormPath,
  InternalFieldList as FieldList
} from '@formily/antd';
import {DeleteOutlined, PlusOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import Form from '@/components/Form';
import {purchaseAskDetail, purchaseAskAdd, purchaseAskEdit} from '../purchaseAskUrl';
import * as SysField from '../purchaseAskField';
import {request} from '@/util/Request';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: purchaseAskDetail,
  add: purchaseAskAdd,
  save: purchaseAskEdit
};

const PurchaseAskEdit = ({...props}, ref) => {

  const formRef = useRef();

  const [details, setDetails] = useState([]);

  let number = 0;
  details.map((item) => {
    if (item && item.applyNumber) {
      number += item.applyNumber;
    }
    return null;
  });

  useImperativeHandle(ref, () => ({
    formRef,
  }));
  return (
    <div
      style={{padding: 16, width: 1700, overflow: 'auto'}}
    >
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        NoButton={false}
        fieldKey="purchaseAskId"
        onSuccess={() => {
          props.onSuccess();
        }}
        onError={() => {
        }}
        onSubmit={(value) => {
          const required = value.purchaseListingParams.filter((items) => {
            return !items.skuId || !items.applyNumber;
          });

          const skuBrands = value.purchaseListingParams.map((items) => {
            return `${items.skuId}${items.brandId}`;
          });

          const sname = skuBrands.filter((item) => {
            const array = skuBrands.filter((value) => {
              return value === item;
            });
            return array.length > 1;
          });

          if (required.length > 0) {
            message.warning('物料、申请数量为必填项！');
            return false;
          } else if (sname.length > 0) {
            message.warning('物料和品牌不能重复！');
            return false;
          } else {
            return value;
          }
        }}
        effects={({setFieldState}) => {

          FormEffectHooks.onFieldValueChange$('purchaseListingParams.*.skuId').subscribe(async ({name, value}) => {
            if (value) {
              const sku = await request({...skuDetail, data: {skuId: value}});

              setFieldState(
                FormPath.transform(name, /\d/, ($1) => {
                  return `purchaseListingParams.${$1}.unitId`;
                }),
                state => {
                  state.value = sku && sku.unit && sku.unit.unitId;
                }
              );
            }
          });

          FormEffectHooks.onFieldValueChange$('purchaseListingParams').subscribe(({value}) => {
            setDetails(value);
          });

        }}
      >
        <ProCard title="基础信息" className="h2Card" headerBordered>
          <div style={{display: 'inline-block', width: '30%'}}>
            <FormItem label="编号" name="coding" component={SysField.Codings} module={5} required />
          </div>
          <div style={{display: 'inline-block', width: '30%'}}>
            <FormItem label="采购申请类型" name="type" component={SysField.Type} module={5} required />
          </div>
          <div style={{display: 'inline-block', width: '30%'}}>
            <FormItem label="备注说明" name="note" component={SysField.Note} />
          </div>
        </ProCard>
        <ProCard title="物料列表" className="h2Card" headerBordered extra={
          <Space>
            <div>
              申请品类:{details.length}
            </div>
            <div>
              申请数量:{number}
            </div>
          </Space>
        }>
          <FieldList
            name="purchaseListingParams"
            initialValue={[
              {},
            ]}
          >
            {({state, mutators}) => {
              const onAdd = () => mutators.push();
              return (
                <div>
                  {state.value.map((item, index) => {
                    const onRemove = index => {
                      mutators.remove(index);
                    };
                    return (
                      <Card
                        style={{marginTop: 8}}
                        headStyle={{border: 'none', borderBottom: 'solid 1px #eee'}}
                        bodyStyle={{padding: 8}}
                        key={index}>
                        <Avatar size={24}>{`${index + 1}`}</Avatar>
                        <div style={{width: '16%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={7}
                            itemStyle={{margin: 0}}
                            label="物料"
                            name={`purchaseListingParams.${index}.skuId`}
                            component={SysField.SkuId}
                          />
                        </div>
                        <div style={{width: '16%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={7}
                            itemStyle={{margin: 0}}
                            label="品牌"
                            value={0}
                            name={`purchaseListingParams.${index}.brandId`}
                            component={SysField.BrandId}
                          />
                        </div>
                        <div style={{width: '12%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={12}
                            itemStyle={{margin: 0}}
                            label="申请数量"
                            name={`purchaseListingParams.${index}.applyNumber`}
                            component={SysField.ApplyNumber}
                          />
                        </div>
                        <div style={{width: '3%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={10}
                            itemStyle={{margin: 0}}
                            name={`purchaseListingParams.${index}.unitId`}
                            component={SysField.UnitId}
                          />
                        </div>
                        <div style={{width: '13%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={12}
                            itemStyle={{margin: 0}}
                            label={<>可用数量&nbsp;&nbsp;
                              <Popover content="您当前可使用此物料的数量=库存数量+采购数量-其他生产订单预定数量">
                                <QuestionCircleOutlined style={{cursor: 'pointer'}} />
                              </Popover></>}
                            value={666}
                            name={`purchaseListingParams.${index}.availableNumber`}
                            component={SysField.AvailableNumber}
                          />
                        </div>
                        <div style={{width: '14%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={10}
                            itemStyle={{margin: 0}}
                            label="交付日期"
                            name={`purchaseListingParams.${index}.deliveryDate`}
                            component={SysField.Date}
                          />
                        </div>
                        <div style={{width: '16%', display: 'inline-block'}}>
                          <FormItem
                            itemStyle={{margin: 0}}
                            labelCol={7}
                            label="备注"
                            name={`purchaseListingParams.${index}.note`}
                            component={SysField.LisingNote}
                          />
                        </div>
                        <Button
                          type="link"
                          style={{float: 'right'}}
                          disabled={state.value.length === 1}
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            onRemove(index);
                          }}
                          danger
                        />
                      </Card>
                    );
                  })}
                  <Button
                    type="dashed"
                    style={{marginTop: 8}}
                    icon={<PlusOutlined />}
                    onClick={onAdd}>增加产品</Button>
                </div>
              );
            }}
          </FieldList>
        </ProCard>
      </Form>
    </div>
  );
};

export default React.forwardRef(PurchaseAskEdit);
