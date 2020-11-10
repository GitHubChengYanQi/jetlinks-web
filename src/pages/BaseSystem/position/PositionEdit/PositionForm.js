import React, {useRef} from 'react';
import {Card, Form, Input} from '@alifd/next';
import {positionAdd, positionSave, positionView} from '@/Config/ApiUrl/system/position';
import EditForm from '@/components/Editform';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18}
};

const constValue = {
  name: '',
  code: '',
  remark: '',
  sort: ''
};

const ApiConfig = {
  View: positionView,
  Add: positionAdd,
  Save: positionSave
}

const PositionForm = ({id, ...other}) => {

  const formRef = useRef();

  return (
    <EditForm
      constValue={constValue}
      formItemLayout={formItemLayout}
      fieldKey="positionId"
      id={id}
      ApiConfig={ApiConfig}
      ref={formRef}
      {...other}
    >
      <Card contentHeight='auto' className='edit-block'>
        <Card.Content>
          <FormItem {...formItemLayout} label="职位名称" required requiredMessage="请输入职位名称">
            <Input placeholder="请输入职位名称" name="name"/>
          </FormItem>
          <FormItem {...formItemLayout} label="职位编码" required requiredMessage="请输入职位编码">
            <Input placeholder="请输入职位编码" name="code"/>
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            <Input placeholder="请输备注" name="remark"/>
          </FormItem>
          <FormItem {...formItemLayout} wrapperCol={{span: 5}} label="排序">
            <Input placeholder="排序" name="sort"/>
          </FormItem>
        </Card.Content>
      </Card>
    </EditForm>
  );
}

export default PositionForm;