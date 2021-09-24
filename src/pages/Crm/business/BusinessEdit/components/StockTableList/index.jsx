/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Modal as AntModal, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import {MegaLayout} from '@formily/antd-components';
import {createFormActions, FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined, SelectOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import CheckButton from '@/components/CheckButton';
import {useBoolean} from "ahooks";
import {useHistory} from "ice";

import Modal from '@/components/Modal';
import AddItem from '@/pages/Crm/business/BusinessEdit/components/AddItem';
import SelButton from '@/components/SelButton';
import * as SysField from '@/pages/Erp/stock/StockField';
import {stockList} from '@/pages/Erp/stock/StockUrl';


const {Column} = AntTable;
const {FormItem} = Form;
const formActionsPublic = createFormActions();
const StockTableList = (props) => {

  const {choose, state,...other} = props;
  const tableRef = useRef(null);
  const modalRef = useRef(null);
  const submitRef = useRef(null);

  const [search,{toggle}]  = useBoolean(false);
  const [selectData, setSelectData] = useState(null);
  useEffect(() => {
    if (state) {
      tableRef.current.formActions.setFieldValue('storehouseId', state ? state[0] : null);
      tableRef.current.submit();
    }
  }, [state]);

  const searchForm = () => {
    return (
      <>
        <FormItem mega-props={{span: 1}} placeholder="产品名称" name="itemId" component={SysField.ItemId} />
      </>
    );
  };

  const [ids, setIds] = useState([]);
  let TcDisabled = true;
  if(props.TcDisabled === undefined){
    TcDisabled = true;
  }else{
    TcDisabled = false;
  }
  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (
      !TcDisabled && <SelButton
        size="small"
        onClick={()=>{

          if(selectData !== null && selectData.length > 0){
            modalRef.current.open(false);
          }
          else{
            AntModal.confirm({
              title: '提示',
              content: '请至少选择一条数据!',
              confirmLoading: true,
              style: {marginTop: '15%'},
              onOk: async () => {
              },
              onCancel: () => {
              }
            });
          }
        }}
        icon={<SelectOutlined />}
        type="primary" >批量选择</SelButton>);
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        listHeader={TcDisabled}
        api={stockList}
        isModal={false}
        rowSelection={TcDisabled}
        formActions={formActionsPublic}
        // SearchButton={Search()}
        layout={search}
        rowKey="stockId"
        searchForm={searchForm}
        ref={tableRef}
        onChange={(keys, row) => {
          setIds(keys);
          setSelectData(row);
        }}
        footer={TcDisabled ? null : footer}
        {...other}
      >
        <Column title="产品名称"  render={(text, record) => {
          return (
            <>
              {record.itemsResult.name}
            </>
          );
        }} sorter />
        salePrice
        <Column title="销售单价" width={120} align='center' sorter dataIndex="salePrice" />
        {/*<Column title="品牌"  width={200} render={(text, record) => {*/}
        {/*  return (*/}
        {/*    <>*/}
        {/*      {record.brandResult.brandName}*/}
        {/*    </>*/}
        {/*  );*/}
        {/*}} sorter />*/}
        {/*<Column title="仓库名称" style={{maxWidth:200}} fixed  render={(text, record) => {*/}
        {/*  return (*/}
        {/*    <>*/}
        {/*      <Button type="link" onClick={() => {*/}
        {/*        history.push({pathname:`/ERP/stockDetails/${record.itemsResult.itemId}`,*/}
        {/*          params:{storehouseId: record.storehouseId,brandId:record.brandId,itemId:record.itemId}});*/}
        {/*      }}>{record.storehouseResult.name}</Button>*/}
        {/*    </>*/}
        {/*  );*/}
        {/*}} sorter />*/}
        {/*<Column title="数量" width={120} align='center' sorter dataIndex="inventory" />*/}
        <Column />
      </Table>
      <Modal width={1200}
        title="编辑选择"
        data={selectData}
        compoentRef={submitRef}
        ref={modalRef}
        footer={
          <>
            <Button type="primary" onClick={() => {
              submitRef.current.formRef.current.submit();
            }}>
              保存
            </Button>
            <Button onClick={() => {
              modalRef.current.close();
            }}>
               取消
            </Button>
          </>
        }
        onSuccess={()=>{
          props.onSuccess();
        }}
        component={AddItem}
        packageId={props.packageId}
        businessId={props.businessId}
      />
    </>
  );
};

export default StockTableList;
