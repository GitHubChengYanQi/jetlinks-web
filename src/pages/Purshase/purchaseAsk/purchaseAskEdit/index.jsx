/**
 * 采购申请编辑页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React, {useImperativeHandle, useRef, useState} from 'react';
import {Avatar, Button, Card, Col, Input, message, Popover, Row, Space} from 'antd';
import Form from '@/components/Form';
import {purchaseAskDetail, purchaseAskAdd, purchaseAskEdit} from '../purchaseAskUrl';
import * as SysField from '../purchaseAskField';
import ProCard from '@ant-design/pro-card';
import {
  createAsyncFormActions,
  createFormActions,
  FormEffectHooks,
  FormPath,
  InternalFieldList as FieldList
} from '@formily/antd';
import {DeleteOutlined, PlusOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {Codings, LisingNote} from '../purchaseAskField';
import {useRequest} from '@/util/Request';
import {codingRulesList} from '@/pages/Erp/tool/toolUrl';
import ProSkeleton from '@ant-design/pro-skeleton';
import {createActions} from 'react-eva';
import {useBoolean} from 'ahooks';

const {FormItem} = Form;

const ApiConfig = {
  view: purchaseAskDetail,
  add: purchaseAskAdd,
  save: purchaseAskEdit
};

const PurchaseAskEdit = ({...props}, ref) => {

  const formRef = useRef();

  const [skuIds, setSkuIds] = useState([]);

  useImperativeHandle(ref, () => ({
    formRef,
  }));

  const {loading, data} = useRequest(codingRulesList, {
    defaultParams: {
      data: {
        module: 1,
        state: 1
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  return (
    <div
      style={{padding: 16}}
    >
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        NoButton={false}
        fieldKey="purchaseAskId"
        onSubmit={(value) => {
          const required = value.purchaseListingParams.filter((items) => {
            return !items.skuId || !items.applyNumber;
          });
          if (required.length > 0) {
            message.warning('物料和申请数量为必填项！');
            return false;
          } else {
            return value;
          }
        }}
        effects={() => {
          FormEffectHooks.onFieldValueChange$('purchaseListingParams.*.skuId').subscribe(({name, value}) => {
            const array = skuIds;
            if (value !== undefined)
              array[name.match(/\d/g)[0]] = value;
            else
              array.splice(name.match(/\d/g)[0], 1);
            setSkuIds(array);
          });
        }}
      >
        <ProCard title="入库信息" className="h2Card" headerBordered>
          <div style={{display: 'inline-block', width: '30%'}}>
            <FormItem label="编号" name="coding" component={SysField.Codings} codingId={data} required />
          </div>
          {/*<div style={{display: 'inline-block', width: '30%'}}>*/}
          {/*  <FormItem label="采购类型" name="type" component={SysField.Type} required />*/}
          {/*</div>*/}
          <div style={{display: 'inline-block', width: '30%'}}>
            <FormItem label="备注" name="note" component={SysField.Note} />
          </div>

        </ProCard>
        <ProCard title="物料列表" className="h2Card" headerBordered>
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
                        <div style={{width: '22%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={7}
                            itemStyle={{margin: 0}}
                            label="物料"
                            skuIds={skuIds}
                            name={`purchaseListingParams.${index}.skuId`}
                            component={SysField.SkuId}
                          />
                        </div>
                        <div style={{width: '15%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={10}
                            itemStyle={{margin: 0}}
                            label="申请数量"
                            name={`purchaseListingParams.${index}.applyNumber`}
                            component={SysField.ApplyNumber}
                          />
                        </div>
                        <div style={{width: '20%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={10}
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
                        <div style={{width: '18%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={7}
                            itemStyle={{margin: 0}}
                            label="交付日期"
                            name={`purchaseListingParams.${index}.deliveryDate`}
                            component={SysField.Date}
                          />
                        </div>
                        <div style={{width: '20%', display: 'inline-block'}}>
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
