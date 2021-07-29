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
import ContractMachineEdit from '../ContractMachineEdit';
import '../ContractMachineEdit/index.model.scss';
import * as SysField from '@/pages/Crm/contractMachine/ContractMachineField';
import {templateDelete, templateList} from '@/pages/Crm/template/TemplateUrl';
import TemplateEdit from '@/pages/Crm/template/TemplateEdit';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;

const ContractMachineList1 = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>

      </>
    );
  };

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
      <Modal2 width={1500} title="编辑" component={ContractMachineEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ContractMachineList1;
