/**
 * 盘点任务主表编辑页
 *
 * @author Captain_Jazz
 * @Date 2021-12-27 09:27:27
 */

import React, {useRef} from 'react';
import {InternalFieldList as FieldList} from '@formily/antd';
import ProCard from '@ant-design/pro-card';
import {Avatar, Button, Card, Space} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import * as SysField from '../inventoryField';
import {inventoryDetail, inventoryAdd, inventoryEdit} from '../inventoryUrl';
import Form from '@/components/Form';
import {useRequest} from '@/util/Request';
import {codingRulesList} from '@/pages/Erp/tool/toolUrl';
import ProSkeleton from '@ant-design/pro-skeleton';

const {FormItem} = Form;

const ApiConfig = {
  view: inventoryDetail,
  add: inventoryAdd,
  save: inventoryEdit
};

const InventoryEdit = ({...props}) => {

  const formRef = useRef();

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
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="inventoryTaskId"
      onSuccess={() => {
        props.onSuccess();
      }}
      onError={() => {

      }}
      onSubmit={(value) => {
        return {...value};
      }}
      effects={({setFieldState, getFieldState}) => {

      }}
    >
      <FormItem label="编码" name="coding" codingId={data} module={1} component={SysField.Codings} required />
      <FormItem label="任务名称" name="inventoryTaskName" component={SysField.InventoryTaskName} required />
      <FormItem label="负责人" name="userId" component={SysField.UserId} required />
      <FormItem label="备注" name="userId" component={SysField.Remark} required />
    </Form>
  );
};

export default InventoryEdit;
