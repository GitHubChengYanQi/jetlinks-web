/**
 * 合同模板编辑页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React, {useImperativeHandle, useRef, useState} from 'react';
import {Col, Row} from 'antd';
import {createFormActions} from '@formily/antd';
import Form from '@/components/Form';
import {templateDetail, templateAdd, templateEdit} from '../TemplateUrl';
import * as SysField from '../TemplateField';
import Editor from '@/components/Editor';

const {FormItem} = Form;

const ApiConfig = {
  view: templateDetail,
  add: templateAdd,
  save: templateEdit
};

const formActionsPublic = createFormActions();

const TemplateEdit = ({...props}, ref) => {

  const formRef = useRef();

  const editorRef = useRef(null);

  const [detail, setDetail] = useState({});

  useImperativeHandle(ref, () => ({
    submit: formRef.current.submit,
  }));

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        NoButton={false}
        ref={formRef}
        details={(value) => {
          setDetail(value);
        }}
        formActions={formActionsPublic}
        api={ApiConfig}
        fieldKey="templateId"
        onSubmit={(value) => {
          const content = editorRef.current.editorSave();
          value = {
            ...value,
            content,
          };
          return value;
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="合同名" name="name" component={SysField.Name} required />
          </Col>
          <Col span={12}>
            <FormItem label="合同分类" name="contractClassId" component={SysField.ContractClassId} required />
          </Col>
        </Row>
        <Editor module="contacts" placeholder="输入合同模板.." value={detail.content} ref={editorRef} />
      </Form>
    </div>
  );
};

export default React.forwardRef(TemplateEdit);
