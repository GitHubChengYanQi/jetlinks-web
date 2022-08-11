/**
 * 编辑模板编辑页
 *
 * @author Captain_Jazz
 * @Date 2021-12-28 13:24:55
 */

import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {printTemplateDetail, printTemplateAdd, printTemplateEdit} from '../printTemplateUrl';
import * as SysField from '../printTemplateField';
import Editor from '@/components/Editor';

const {FormItem} = Form;

const ApiConfig = {
  view: printTemplateDetail,
  add: printTemplateAdd,
  save: printTemplateEdit
};

const PrintTemplateEdit = ({...props}) => {

  const formRef = useRef();

  const editorRef = useRef();

  const [type, setType] = useState();

  const [detail, setDetail] = useState({});

  return (
    <Form
      {...props}
      ref={formRef}
      details={setDetail}
      api={ApiConfig}
      fieldKey="printTemplateId"
      onSubmit={(value) => {
        const templete = editorRef.current.editorSave();
        value = {
          ...value,
          templete,
        };
        return value;
      }}
    >
      <FormItem label="类型" name="type" component={SysField.Type} required typeChange={(type) => {
        setType('');
        setTimeout(() => {
          setType(type);
        }, 0);
      }} />
      <FormItem label="名称" name="name" component={SysField.Name} required />
      {type && <Editor module={type} ref={editorRef} value={detail.templete} />}
    </Form>
  );
};

export default PrintTemplateEdit;
