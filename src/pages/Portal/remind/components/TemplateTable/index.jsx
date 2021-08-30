import React, {useRef} from 'react';
import {Button, Card, Table as AntTable} from 'antd';
import styled from 'styled-components';
import {FormItem, InternalFieldList as FieldList} from '@formily/antd';
import {Input} from '@formily/antd-components';
import Form from '@/components/Form';
import {remindAdd, remindDetail, remindEdit, remindTemplate} from '@/pages/Portal/remind/remindUrl';
import * as SysField from '@/pages/Portal/remind/remindField';

const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    margin-right: 16px;
    margin-bottom: 16px;
  }
`;

const {Column} = AntTable;

const TemplateTable = (props) => {


  const ApiConfig = {
    view: remindDetail,
    add: remindAdd,
    save: remindEdit
  };


  return (

    <Card
      title="添加模板"
      bordered={false}
    >
      <Form
        {...props}
        api={ApiConfig}
      >
        <FormItem labelAlign='left' label='模板id' name="templateId" component={Input} required />
        <FieldList
          name="dataList"
          initialValue={[]}
        >
          {({state, mutators}) => {
            const onAdd = () => mutators.push();
            return (
              <div>
                {state.value.map((item, index) => {
                  const onRemove = index => mutators.remove(index);
                  const onMoveUp = index => mutators.moveUp(index);
                  const onMoveDown = index => mutators.moveDown(index);
                  return (
                    <RowStyleLayout key={index}>
                      <FormItem
                        name={`dataList.${index}.key`}
                        component={Input}
                        required
                      />
                      <FormItem
                        name={`dataList.${index}.value`}
                        component={Input}
                        required
                      />
                      {/* eslint-disable-next-line react/jsx-no-bind */}
                      <Button onClick={onRemove.bind(null, index)}>remove</Button>
                      {/* eslint-disable-next-line react/jsx-no-bind */}
                      <Button onClick={onMoveUp.bind(null, index)}>up</Button>
                      {/* eslint-disable-next-line react/jsx-no-bind */}
                      <Button onClick={onMoveDown.bind(null, index)}>down</Button>
                    </RowStyleLayout>
                  );
                })}
                <Button onClick={onAdd}>add</Button>
              </div>
            );
          }}
        </FieldList>
        <div style={{height:0}}>
          <FormItem hidden name="type" component={SysField.Type} required />
          <FormItem hidden name="users" component={SysField.UserId} displays='none' required />
        </div>
      </Form>
    </Card>

  );
};

export default TemplateTable;
