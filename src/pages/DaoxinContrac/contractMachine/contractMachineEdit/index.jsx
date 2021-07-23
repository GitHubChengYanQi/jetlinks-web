/**
 * 合同模板编辑页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React, {useRef} from 'react';
import {Input, InputNumber, Select as AntdSelect, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import {templateAdd, templateDetail, templateEdit, templateList} from '@/pages/DaoxinContrac/template/templateUrl';
import * as SysField from '@/pages/DaoxinContrac/contractMachine/contractMachineField';
import Table from '@/components/Table';
import {Content} from '@/pages/DaoxinContrac/contractMachine/contractMachineField';
import {contractAdd} from '@/pages/DaoxinContrac/contractMachine/contractMachineUrl';
import parse from 'html-react-parser';
import {DatePicker2} from '@alifd/next';
const {FormItem} = Form;
const {Column} = AntTable;
const ApiConfig = {
  view: templateDetail,
  add: templateAdd,
  save: contractAdd
};


const TemplateEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="templateId"
    >

      <FormItem name="content" component={SysField.Content} required/>


    </Form>
  );
};

export default TemplateEdit;
