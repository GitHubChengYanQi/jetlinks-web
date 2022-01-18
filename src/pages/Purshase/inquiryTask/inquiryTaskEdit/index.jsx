/**
 * 询价任务编辑页
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React, {useRef} from 'react';
import ProSkeleton from '@ant-design/pro-skeleton';
import ProCard from '@ant-design/pro-card';
import {InternalFieldList as FieldList} from '@formily/antd';
import {Avatar, Card} from 'antd';
import Form from '@/components/Form';
import {inquiryTaskDetail, inquiryTaskAdd, inquiryTaskEdit} from '../inquiryTaskUrl';
import * as SysField from '../inquiryTaskField';
import {useRequest} from '@/util/Request';
import {codingRulesList} from '@/pages/Erp/tool/toolUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: inquiryTaskDetail,
  add: inquiryTaskAdd,
  save: inquiryTaskEdit
};

const InquiryTaskEdit = ({...props}) => {

  const {value,onSuccess} = props;

  const formRef = useRef();

  const {loading, data} = useRequest(codingRulesList, {
    defaultParams: {
      data: {
        module: 7,
        state: 1
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  return (
    <div style={{padding: 16}}>
      <Form
        onSuccess={onSuccess}
        onError={()=>{}}
        value={false}
        ref={formRef}
        api={ApiConfig}
        fieldKey="inquiryTaskId"
      >
        <ProCard title="基本信息" className="h2Card" headerBordered>
          <div style={{display: 'inline-block', width: '30%'}}>
            <FormItem
              label="任务编码"
              name="inquiryTaskCode"
              codingId={data}
              module={7}
              component={SysField.Codings}
              required />
          </div>
          <div style={{display: 'inline-block', width: '30%'}}>
            <FormItem label="负责人" name="userId" component={SysField.UserId} required />
          </div>
          <div style={{display: 'inline-block', width: '30%'}}>
            <FormItem label="截至日期" name="deadline" component={SysField.Deadline} required />
          </div>
          <div style={{display: 'inline-block', width: '30%'}}>
            <FormItem label="供应商等级" labelCol={7} name="supplierLevel" component={SysField.SupplierLevel} required />
          </div>
          <div style={{display: 'inline-block', width: '30%'}}>
            <FormItem label="是否供应商物料" labelCol={9} name="isSupplier" component={SysField.IsSupplier} required />
          </div>
        </ProCard>

        <ProCard title="物料列表" className="h2Card" headerBordered>
          <FieldList
            name="detailParams"
            initialValue={
              value.map((item)=>{
                return {
                  total:item.applyNumber,
                  skuId:item.skuId,
                  sku:item.skuResult
                };
              })
            }
          >
            {({state}) => {
              return (
                <div>
                  {state.value.map((item, index) => {
                    return (
                      <Card
                        style={{marginTop: 8}}
                        headStyle={{border: 'none', borderBottom: 'solid 1px #eee'}}
                        bodyStyle={{padding: 8}}
                        key={index}>
                        <Avatar size={24}>{`${index + 1}`}</Avatar>
                        <div style={{width: '40%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={4}
                            itemStyle={{margin: 0}}
                            label="物料"
                            name={`detailParams.${index}.sku`}
                            component={SysField.SkuId}
                          />
                        </div>
                        <div style={{width: '20%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={10}
                            label="询价数量"
                            name={`detailParams.${index}.total`}
                            component={SysField.Number}
                          />
                        </div>
                        <div style={{width: '30%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={4}
                            itemStyle={{margin: 0}}
                            label="备注"
                            name={`detailParams.${index}.remark`}
                            component={SysField.Remark}
                          />
                        </div>
                      </Card>
                    );
                  })}
                </div>
              );
            }}
          </FieldList>
        </ProCard>

      </Form>
    </div>
  );
};

export default InquiryTaskEdit;
