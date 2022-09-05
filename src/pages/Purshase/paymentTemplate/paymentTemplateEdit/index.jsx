/**
 * 付款模板编辑页
 *
 * @author song
 * @Date 2022-02-24 10:36:06
 */

import React, {useRef} from 'react';
import ProCard from '@ant-design/pro-card';
import {createFormActions, InternalFieldList as FieldList} from '@formily/antd';
import {Button, Space} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import Form from '@/components/Form';
import {paymentTemplateDetail, paymentTemplateAdd, paymentTemplateEdit} from '../paymentTemplateUrl';
import * as SysField from '../paymentTemplateField';

const {FormItem} = Form;

const ApiConfig = {
  view: paymentTemplateDetail,
  add: paymentTemplateAdd,
  save: paymentTemplateEdit
};

const formActionsPublic = createFormActions();

const PaymentTemplateEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        formActions={formActionsPublic}
        wrapperCol={24}
        fieldKey="templateId"
      >
        <ProCard style={{marginTop: 24}} bodyStyle={{padding: 16}} className="h2Card" title="基本信息" headerBordered>
          <FormItem label="名称" name="name" component={SysField.Name} required />
          <FormItem label="是否常用" name="oftenUser" component={SysField.OftenUser} required />
          <FormItem label="备注" name="remark" component={SysField.Remark} />
        </ProCard>
        <ProCard style={{marginTop: 24}} bodyStyle={{padding: 16}} className="h2Card" title="计划内容" headerBordered>
          <FieldList
            name="templates"
            initialValue={[
              {},
            ]}
          >
            {({state, mutators}) => {
              const onAdd = () => mutators.push();
              return (<div>
                {state.value.map((item, index) => {
                  const onRemove = index => mutators.remove(index);
                  return <Space
                    align="start"
                    key={index}
                  >
                    <FormItem
                      placeholder="请选择动作"
                      name={`templates.${index}.payType`}
                      component={SysField.PayType}
                    />
                    <FormItem
                      placeholder="请输入"
                      name={`templates.${index}.dateNumber`}
                      component={SysField.dateNumber}
                    />
                    <FormItem
                      placeholder="请选择"
                      name={`templates.${index}.dateWay`}
                      component={SysField.DateWay}
                    />
                    支付第一笔占比
                    <FormItem
                      name={`templates.${index}.percentum`}
                      component={SysField.Percentum}
                    />
                    %的款项的
                    <FormItem
                      placeholder="请输入款项说明"
                      rows={1}
                      name={`templates.${index}.remark`}
                      component={SysField.Remark}
                    />
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
                  </Space>;
                })}
                <div>
                  <Button
                    type="dashed"
                    style={{marginTop: 8, marginBottom: 16}}
                    icon={<PlusOutlined />}
                    onClick={onAdd}>添加计划</Button>
                </div>
              </div>);
            }}
          </FieldList>
        </ProCard>
      </Form>
    </div>
  );
};

export default PaymentTemplateEdit;
