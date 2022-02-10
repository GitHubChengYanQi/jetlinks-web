/**
 * sop主表编辑页
 *
 * @author song
 * @Date 2022-02-10 09:21:35
 */

import React, {useImperativeHandle, useRef, useState} from 'react';
import ProCard from '@ant-design/pro-card';
import {InternalFieldList as FieldList} from '@formily/antd';
import {Button, Card, Space} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {MegaLayout} from '@formily/antd-components';
import {useBoolean} from 'ahooks';
import * as SysField from '../sopField';
import {sopDetail, sopAdd, sopEdit} from '../sopUrl';
import Form from '@/components/Form';

const {FormItem} = Form;

const ApiConfig = {
  view: sopDetail,
  add: sopAdd,
  save: sopEdit
};

const SopEdit = ({...props}, ref) => {

  const formRef = useRef();

  useImperativeHandle(ref, () => ({
    submit: formRef.current.submit,
  }));

  const [refresh, {toggle}] = useBoolean();

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="sopId"
        onSuccess={() => {
          props.onSuccess();
        }}
        onError={() => {
        }}
        wrapperCol={24}
      >
        <ProCard title="基本信息" className="h2Card" headerBordered>

          <MegaLayout labelWidth={100} grid>
            <FormItem label="编号" name="coding" component={SysField.Coding} required />
            <FormItem label="名称" name="name" component={SysField.Name} required />
          </MegaLayout>

          <MegaLayout labelWidth={100} grid>
            <FormItem label="版本号" name="versionNumber" component={SysField.VersionNumber} required />
          </MegaLayout>

          <MegaLayout labelWidth={100} grid>
            <FormItem label="成品图" name="finishedPicture" component={SysField.FinishedPicture} required />
          </MegaLayout>
          <MegaLayout labelWidth={100} grid>
            <FormItem label="作业要求" name="note" component={SysField.Note} />
          </MegaLayout>
          {props.value && <MegaLayout labelWidth={100} grid>
            <FormItem label="修改原因" name="alterWhy" component={SysField.AlterWhy} />
          </MegaLayout>}
        </ProCard>
        <ProCard title="作业步骤" className="h2Card" headerBordered>
          <FieldList
            name="sopDetails"
            initialValue={[
              {},
            ]}
          >
            {({state, mutators}) => {
              const onAdd = () => mutators.push();
              return (
                <div>
                  {state.value.map((item, index) => {
                    const onRemove = index => {
                      mutators.remove(index);
                      toggle();
                    };
                    return (
                      <Card
                        style={{marginTop: 8}}
                        headStyle={{border: 'none', borderBottom: 'solid 1px #eee'}}
                        bodyStyle={{padding: 8}}
                        key={index}>
                        <Space>
                          {`步骤${index + 1}`}
                          <FormItem
                            labelCol={8}
                            itemStyle={{margin: 0}}
                            name={`sopDetails.${index}.img`}
                            refresh={refresh}
                            component={SysField.Image}
                            required
                          />
                          <FormItem
                            labelCol={10}
                            itemStyle={{margin: 0}}
                            label="操作说明"
                            name={`sopDetails.${index}.instructions`}
                            component={SysField.Instructions}
                          />
                        </Space>
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
                    onClick={onAdd}>增加步骤</Button>
                </div>
              );
            }}
          </FieldList>
        </ProCard>
      </Form>
    </div>
  );
};

export default React.forwardRef(SopEdit);
