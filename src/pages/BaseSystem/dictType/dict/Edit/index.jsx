import React from 'react';
import Form from '@/components/Form';
import {Input, Radio} from "antd";

const {FormItem} = Form;

const DictEdit = () => {

  return (
    <Form>
      <FormItem label="名称" name="name" component={Input}/>
      <FormItem label="编码" name="code" component={Input}/>
      <FormItem
        label="状态"
        component={Radio.Group}
        name="status"
        options={
          [
            {
              label: '是',
              value: 'Y',
            },
            {
              label: '否',
              value: 'N',
            }
          ]
        }
      />
      <FormItem label="描述" name="description" component={Input.TextArea}/>
    </Form>
  );
};

export default DictEdit;
