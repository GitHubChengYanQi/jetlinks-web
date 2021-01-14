import React from 'react';
import Form from '@/components/Form';
import {Input, Radio} from 'antd';
import {dictAdd, dictDetail, dictSave, dictTypeSelect} from '@/Config/ApiUrl/system/dict';
import Select from '@/components/Select';

const {FormItem} = Form;

const DictEdit = ({dictTypeId,...props}) => {

  return (
    <Form
      api={
        {
          view: dictDetail,
          save: dictSave,
          add: dictAdd
        }
      }
      defaultValue={{
        name: ''
      }}
      {...props}
    >
      <FormItem
        label="类型"
        required
        name="dictTypeId"
        component={Select}
        initialValue={dictTypeId}
        defaultValue={dictTypeId}
        api={dictTypeSelect}
        disabled
      />
      <FormItem label="名称" required name="name" component={Input}/>
      <FormItem label="编码" required name="code" component={Input}/>
      <FormItem
        required
        label="状态"
        component={Radio.Group}
        name="status"
        initialValue="ENABLE"
        options={
          [
            {
              label: '启用',
              value: 'ENABLE',
            },
            {
              label: '禁用',
              value: 'DISABLE',
            }
          ]
        }
      />
      <FormItem label="描述" name="description" component={Input.TextArea}/>
      <FormItem label="排序" name="sort" component={Input}/>
    </Form>
  );
};

export default DictEdit;
