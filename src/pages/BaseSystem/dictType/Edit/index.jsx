import React from 'react';
import {Input, Radio} from 'antd';
import Form from '@/components/Form';
import {dictTypeDetail} from '@/Config/ApiUrl/system/dict';

const {FormItem} = Form;

const DictTypeEdit = (props) => {

  const {value} = props;

  const disabled = value !== null && value !== undefined;

  return (
    <Form
      {...props}
      api={
        {
          view: dictTypeDetail,
          save: {},
          add: {}
        }
      }
    >
      <FormItem label="名称" name="name" component={Input}/>
      <FormItem label="编码" name="code" component={Input} disabled={disabled}/>
      <FormItem
        label="系统字典"
        name="systemFlag"
        component={Radio.Group}
        disabled={disabled}
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
        } help="系统字典与代码中枚举关联，添加后不可修改"/>
      <FormItem label="排序" name="sort" component={Input}/>
      <FormItem label="字典描述" name="description" component={Input.TextArea}/>
    </Form>
  );
};

export default DictTypeEdit;
