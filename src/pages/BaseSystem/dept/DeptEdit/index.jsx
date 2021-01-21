import React, {useRef} from 'react';
import Form from "@/components/Form";
import {Input} from "antd";
import Cascader from "@/components/Cascader";
import {deptAdd, deptSave, deptTree, deptView} from "@/pages/BaseSystem/dept/url";

const {FormItem} = Form;

const ApiConfig = {
  view: deptView,
  add: deptAdd,
  save: deptSave
};

const DeptEdit = (props) => {

  const formRef = useRef(null);

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="deptId"
    >
      <FormItem label="名称" required name="simpleName" component={Input}/>
      <FormItem label="上级部门" required name="pid" component={Cascader} api={deptTree}/>
      <FormItem label="全名" required name="fullName" component={Input}/>
      <FormItem label="备注" required name="description" component={Input.TextArea}/>
      <FormItem label="排序" name="sort" component={Input}/>
    </Form>
  );
};


export default DeptEdit;
