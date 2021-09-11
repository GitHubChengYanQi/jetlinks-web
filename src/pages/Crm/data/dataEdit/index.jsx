/**
 * 资料编辑页
 *
 * @author song
 * @Date 2021-09-11 13:35:54
 */

import React, {useRef} from 'react';
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

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="dataId"
    >
      <FormItem label="内容" name="content" component={SysField.Content} required/>
      <FormItem label="附件" name="attachment" component={SysField.Attachment} required/>
      <FormItem label="产品" name="itemId" component={SysField.ItemIds} required/>
    </Form>
  );
};

export default DataEdit;
