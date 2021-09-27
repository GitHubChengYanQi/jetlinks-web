import React, {useRef} from 'react';
import {Button, Divider, Table as AntTable} from 'antd';
import {contractList, crmBusinessDetailedDelete, crmBusinessDetailedList} from '@/pages/Crm/business/BusinessUrl';
import EditButton from "@/components/EditButton";
import DelButton from "@/components/DelButton";
import Drawer from "@/components/Drawer";
import * as SysField from "@/pages/Crm/business/BusinessField";
import Form from "@/components/Form";
import Modal from '@/components/Modal';
import CrmBusinessDetailedEdit from "@/pages/Crm/business/crmBusinessDetailed/crmBusinessDetailedEdit";
import ItemPackage from "@/pages/Crm/business/BusinessEdit/components/ItemPackage";
import Table from '@/components/Table';
import {createFormActions} from '@formily/antd';
import {PlusOutlined} from '@ant-design/icons';
import StockTableList from '@/pages/Crm/business/BusinessEdit/components/StockTableList';
import {contractId} from '@/pages/Crm/business/crmBusinessDetailed/crmBusinessDetailedUrl';


const {FormItem} = Form;
const {Column} = AntTable;

const formActionsPublic = createFormActions();

const TableDetail = (props) => {
  const {value,contractId} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  const refAddOne = useRef(null);
  const refAddAll = useRef(null);

  const searchForm = () => {
    return (
      <>
        <FormItem style={{'display': 'none'}} name="businessId" value={value} component={SysField.BusinessId}/>
        <FormItem style={{'display': 'none'}} name="contractId" value={contractId} component={SysField.BusinessId}/>
        <FormItem label='产品名称' name="itemId" component={SysField.itemId}/>
      </>
    );
  };

  return (
    <>
      <div style={{textAlign:'right'}}>
        <Button key='1' style={{marginTop: 15,marginRight: 10}}
          icon={<PlusOutlined />}
          onClick={()=>{
            refAddOne.current.open(false);}}>
            添加产品
        </Button>
        <Modal width={800} title="选择产品" component={StockTableList}
          onSuccess={() => {
            refAddOne.current.close();
            tableRef.current.refresh();
            props.onSuccess();
          }} ref={refAddOne}
          businessId={value}
          TcDisabled={false}
         contractId={contractId}
        />
        <Button key='2'
          style={{marginRight: 16}}
          icon={<PlusOutlined />}
          onClick={()=>{
            refAddAll.current.open(false);
          }}>
          添加产品套餐
        </Button>
        <Modal width={700} title="选择套餐" component={ItemPackage}
          onSuccess={() => {
            refAddAll.current.close();
            tableRef.current.refresh();
            props.onSuccess();
          }} ref={refAddAll}
          disabled={false}
          businessId={value}
               contractId={contractId}
        />
        <Divider  style={{margin: '17px 5px 1px 5px'}}/>
      </div>
      <Table
        headStyle={{display:'none'}}
        api={contractId ? contractList : crmBusinessDetailedList}
        rowKey="id"
        contentHeight
        rowSelection
        formActions={formActionsPublic}
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="产品名称" dataIndex="items" render={(value, record)=>{
          return (
            <div>
              {
                record.itemsResult ? record.itemsResult.name : null
              }
            </div>
          );
        }} />
        <Column title="品牌" dataIndex="brandResult" render={(text, record) => {
          return (
            <>
              {record.brandResult ? record.brandResult.brandName : null}
            </>
          );
        }} />
        <Column width={100} title="销售单价" dataIndex="salePrice"/>
        <Column title="数量" dataIndex="quantity"/>
        <Column title="小计" dataIndex="totalPrice"/>
        {!contractId && <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.id);
              }} />
              <DelButton api={crmBusinessDetailedDelete} value={record.id} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />}
      </Table>
      <Drawer width={800} title="产品" component={CrmBusinessDetailedEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};
export default TableDetail;
