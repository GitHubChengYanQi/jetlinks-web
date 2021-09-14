/**
 * 资料编辑页
 *
 * @author song
 * @Date 2021-09-11 13:35:54
 */

import React, {useRef, useState} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {dataDetail, dataAdd, dataEdit} from '../dataUrl';
import * as SysField from '../dataField';
import {ItemIds} from '../dataField';

const {FormItem} = Form;

const ApiConfig = {
  view: dataDetail,
  add: dataAdd,
  save: dataEdit
};

const DataEdit = ({...props}) => {

  const formRef = useRef();

  const [fileName, setFileName] = useState();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="dataId"
    >
      <FormItem label="资料名称" name="name" component={SysField.Name} required  />
      <FormItem label="内容" name="content" component={SysField.Content} required />
      <FormItem label="上传附件" name="attachment" component={SysField.Attachment} fileName={(value) => {
        setFileName(value);
      }} />
      <FormItem label="产品" name="itemId" component={SysField.ItemIds} required />
      <FormItem label="产品资料分类" name="dataClassificationId" component={SysField.DataClassificationId} required />
    </Form>
  );
};

export default DataEdit;
