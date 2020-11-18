import React from 'react';
import Form from '@/components/Form';
import {Input, Radio} from 'antd';
import {dictAdd, dictDetail, dictSave} from '@/Config/ApiUrl/system/dict';

const {FormItem} = Form;

const DictEdit = (props) => {

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
              label: '是',
              value: 'ENABLE',
            },
            {
              label: '否',
              value: 'DISABLE',
            }
          ]
        }
      />
      <FormItem label="描述" name="description" component={Input.TextArea}/>
    </Form>
  );
};

export default DictEdit;
