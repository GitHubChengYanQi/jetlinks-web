import React from 'react';
import {Button, Card, Collapse} from 'antd';
import styled from 'styled-components';
import {FormItem, InternalFieldList as FieldList} from '@formily/antd';
import Form from '@/components/Form';
import {remindAdd, remindDetail, remindEdit} from '@/pages/Portal/remind/remindUrl';
import * as SysField from '@/pages/Portal/remind/remindField';
import styles from './index.module.scss';

const { Panel } = Collapse;

const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    margin-right: 16px;
    width: 42%;
    //margin-bottom: 16px;
  }
`;


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
        <FormItem  labelAlign="left" label="模板id" name="template.templateId" component={SysField.templateId} required />
        <FormItem labelAlign="left" label="打开的URL" name="template.url" component={SysField.url} required />
        <FieldList
          name="template.dataList"
        >
          {({state, mutators}) => {
            const onAdd = () => mutators.push();
            return (
              <div>
                {state.value.map((item, index) => {
                  const onRemove = index => mutators.remove(index);
                  return (
                    <RowStyleLayout key={index}>
                      <FormItem
                        name={`template.dataList.${index}.key`}
                        component={SysField.key}
                        required
                      />
                      <FormItem
                        name={`template.dataList.${index}.value`}
                        component={SysField.value}
                        required
                      />
                      {/* eslint-disable-next-line react/jsx-no-bind */}
                      <Button onClick={onRemove.bind(null, index)}>删除</Button>
                    </RowStyleLayout>
                  );
                })}
                <Button onClick={onAdd}>增加</Button>
              </div>
            );
          }}
        </FieldList>
        <div style={{height: 0}}>
          <FormItem hidden name="type" component={SysField.Type} required />
          <FormItem hidden name="users" component={SysField.UserId} displays="none" required />
        </div>
      </Form>
      <Collapse style={{marginTop:20}}>
        <Panel header="所有变量" key="1">
          <p>
            <ul className={styles.var}>
              <li> {'用户变量{{user}}'} </li>
              <li> {'报修人变量:{{name}}'}</li>
              <li> {'时间变量：{{time}}'}  </li>
              <li> {'备注变量：{{note}}'} </li>
              <li> {'详情变量{{details}}'}</li>
              <li> {'设备名称变量{{item}}'} </li>
              <li> {'服务类型变量:{{serviceType}}'}</li>
              <li> {'维修费用变量：{{money}}'}  </li>
              <li> {'质保类型变量：{{qualityType}}'} </li>
              <li> {'使用单位变量{{customer}}'}</li>
            </ul>
          </p>
        </Panel>
      </Collapse>
    </Card>

  );
};

export default TemplateTable;
