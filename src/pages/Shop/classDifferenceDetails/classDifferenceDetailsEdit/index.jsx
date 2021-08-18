/**
 * 分类明细内容编辑页
 *
 * @author siqiang
 * @Date 2021-08-18 15:57:52
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {classDifferenceDetailsDetail, classDifferenceDetailsAdd, classDifferenceDetailsEdit} from '../classDifferenceDetailsUrl';
import * as SysField from '../classDifferenceDetailsField';

const {FormItem} = Form;

const ApiConfig = {
  view: classDifferenceDetailsDetail,
  add: classDifferenceDetailsAdd,
  save: classDifferenceDetailsEdit
};

const ClassDifferenceDetailsEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="detailId"
    >
      <FormItem label="产品名" name="title" component={SysField.Title} required/>
      <FormItem label="图片路径" name="imgUrl" component={SysField.ImgUrl} required/>
      <FormItem label="链接" name="link" component={SysField.Link} required/>
    </Form>
  );
};

export default ClassDifferenceDetailsEdit;
