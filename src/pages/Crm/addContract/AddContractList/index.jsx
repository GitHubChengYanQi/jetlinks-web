/**
 * 机床合同表列表页
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {PageHeader, Table as AntTable} from 'antd';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import Form from '@/components/Form';
import ContractMachineEdit from '../AddContractEdit';
import '../AddContractEdit/index.model.scss';
import * as SysField from '@/pages/Crm/contract/ContractField';
import {templateDelete, templateList} from '@/pages/Crm/template/TemplateUrl';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import AddContractEdit from '../AddContractEdit';

const {Column} = AntTable;
const {FormItem} = Form;

const AddContractList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);

 const searchForm = () => {
   return (
     <>
       <FormItem label="合同模板" name="name" component={SysField.Name}/>
     </>
    );
  };



  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={templateList}
        rowKey="templateId"
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="合同模板" dataIndex="name"/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <AddButton onClick={() => {
                ref.current.open(record.templateId);
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Modal2 width={1500} title="编辑" component={AddContractEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default AddContractList;
