/**
 * 合同模板编辑页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React, {useImperativeHandle, useRef, useState} from 'react';
import {Col, Row} from 'antd';
import {createFormActions, MegaLayout} from '@formily/antd';
import Form from '@/components/Form';
import {templateDetail, templateAdd, templateEdit} from '../TemplateUrl';
import * as SysField from '../TemplateField';
import Editor from '@/components/Editor';
import {Contacts} from '@/components/Editor/components/Module';
import ProCard from '@ant-design/pro-card';

const {FormItem} = Form;

const ApiConfig = {
  view: templateDetail,
  add: templateAdd,
  save: templateEdit
};

const formActionsPublic = createFormActions();

const TemplateEdit = ({...props}, ref) => {

  const formRef = useRef();
  useImperativeHandle(ref, () => ({
    submit: formRef.current.submit,
  }));

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        NoButton={false}
        ref={formRef}
        formActions={formActionsPublic}
        api={ApiConfig}
        wrapperCol={24}
        fieldKey="templateId"
        onSubmit={(value) => {
          value = {
            ...value,
          };
          return value;
        }}
      >
        <Row>
          <Col span={12} style={{paddingRight:24}}>
            <ProCard className="h2Card" title="基本信息" bodyStyle={{padding: 0}}>
              <FormItem label="合同名" name="name" component={SysField.Name} required />
              <FormItem label="合同分类" name="contractClassId" component={SysField.ContractClassId} required />
              <FormItem label="上传合同" name="fileId" component={SysField.UploadWord} required />
            </ProCard>
          </Col>
          <Col span={12} style={{height:'100%',overflow:'auto'}}>
            <Contacts />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default React.forwardRef(TemplateEdit);
