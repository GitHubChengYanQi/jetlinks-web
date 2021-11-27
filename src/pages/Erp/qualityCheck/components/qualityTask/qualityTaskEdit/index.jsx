/**
 * 质检任务编辑页
 *
 * @author
 * @Date 2021-11-16 09:54:41
 */

import React, {useRef} from 'react';
import {Avatar, Button, Card, Input} from 'antd';
import Form from '@/components/Form';
import {qualityTaskDetail, qualityTaskAdd, qualityTaskEdit} from '../qualityTaskUrl';
import * as SysField from '../qualityTaskField';
import {request, useRequest} from '@/util/Request';
import {codingRulesList} from '@/pages/Erp/tool/toolUrl';
import ProSkeleton from '@ant-design/pro-skeleton';
import ProCard from '@ant-design/pro-card';
import {FormEffectHooks, FormPath, InternalFieldList as FieldList} from '@formily/antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {config} from 'ice';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: qualityTaskDetail,
  add: qualityTaskAdd,
  save: qualityTaskEdit
};

const {wxCp} = config;

const QualityTaskEdit = ({...props}) => {

  const formRef = useRef();

  const {loading, data} = useRequest(codingRulesList, {
    defaultParams: {
      data: {
        module: 4,
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
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="qualityTaskId"
        onSuccess={() => {
          props.onSuccess();
        }}
        onError={() => {

        }}
        onSubmit={(value) => {
          return {...value, url: `${wxCp}OrCode?id=codeId`};
        }}
        effects={({setFieldState})=>{

          FormEffectHooks.onFieldValueChange$('details.*.skuId').subscribe(async ({name,value}) => {
            if (value){
              const sku = await request({
                ...skuDetail,
                data:{
                  skuId:value,
                }
              });
              if (sku && sku.qualityPlanId){
                setFieldState(
                  FormPath.transform(name, /\d/, ($1) => {
                    return `details.${$1}.qualityPlanId`;
                  }),
                  state => {
                    state.value = sku.qualityPlanId;
                  }
                );
              }

            }

          });
        }}
      >

        <ProCard title="质检信息" className="h2Card" headerBordered>
          <div style={{display: 'inline-block', width: '40%'}}>
            <FormItem
              label="编码"
              name="coding"
              component={SysField.Codings}
              codingId={data}
              rules={[{required: true, message: data && data.length > 0 ? '该字段是必填字段' : '请先设置编码！'}]}
            />
          </div>
          <div style={{display: 'inline-block', width: '30%'}}>
            <FormItem label="类型" name="type" component={SysField.Type} required />
          </div>
          <div style={{display: 'inline-block', width: '30%'}}>
            <FormItem label="负责人" name="userId" component={SysField.UserId} required />
          </div>
          <div style={{display: 'inline-block', width: '40%'}}>
            <FormItem label="备注" name="remark" component={SysField.Remark} />
          </div>

        </ProCard>
        <ProCard title="物料列表" className="h2Card" headerBordered>
          <FieldList
            name="details"
            initialValue={[
              {},
            ]}
          >
            {({state, mutators}) => {
              const onAdd = () => mutators.push();
              return (
                <div>
                  {state.value.map((item, index) => {
                    const onRemove = index => mutators.remove(index);
                    return (
                      <Card
                        style={{marginTop: 8}}
                        headStyle={{border: 'none', borderBottom: 'solid 1px #eee'}}
                        bodyStyle={{padding: 8}}
                        key={index}>
                        <Avatar size={24}>{`${index + 1}`}</Avatar>
                        <div style={{width: '21%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={7}
                            itemStyle={{margin: 0}}
                            label="物料"
                            name={`details.${index}.skuId`}
                            component={SysField.SkuId}
                            required
                          />
                        </div>
                        <div style={{width: '27%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={10}
                            itemStyle={{margin: 0}}
                            label="供应商 / 品牌"
                            name={`details.${index}.brandId`}
                            component={SysField.BrandId}
                            required
                          />
                        </div>
                        <div style={{width: '15%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={8}
                            itemStyle={{margin: 0}}
                            label="数量"
                            name={`details.${index}.number`}
                            component={SysField.Number}
                            required
                          />
                        </div>
                        <div style={{width: '23%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={8}
                            itemStyle={{margin: 0}}
                            label="质检方案"
                            name={`details.${index}.qualityPlanId`}
                            component={SysField.QualityPlanId}
                            required
                          />
                        </div>
                        <div style={{width: '7%', display: 'inline-block'}}>
                          <FormItem
                            name={`details.${index}.batch`}
                            component={SysField.Batch}
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

export default QualityTaskEdit;
