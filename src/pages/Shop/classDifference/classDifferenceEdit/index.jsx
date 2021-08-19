/**
 * 分类明细编辑页
 *
 * @author siqiang
 * @Date 2021-08-18 15:57:33
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {classDifferenceDetail, classDifferenceAdd, classDifferenceEdit} from '../classDifferenceUrl';
import * as SysField from '../classDifferenceField';

const {FormItem} = Form;

const ApiConfig = {
  view: classDifferenceDetail,
  add: classDifferenceAdd,
  save: classDifferenceEdit
};

const ClassDifferenceEdit = ({...props}) => {

  const {classId} = props;

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="classDifferenceId"
      onSuccess={()=>{
        props.onSuccess();
      }}
    >
      <FormItem label="分类名" name="title" component={SysField.Title} required/>
      <FormItem label="排序" name="sort" component={SysField.Sort} required/>
      <FormItem hidden name="classId" component={SysField.ClassId} classId={classId || null} required/>
    </Form>
  );
};

export default ClassDifferenceEdit;
