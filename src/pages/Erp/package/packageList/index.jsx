/**
 * 套餐表列表页
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React, {useEffect, useRef, useState} from 'react';

import {Button, Card, Col, Input, message, Row, Table as AntTable, Tabs} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Modal2 from '@/components/Modal';
import TableList from '@/pages/Erp/package/packageList/components/TableList';
import style from "@/pages/Crm/customer/CustomerDetail/compontents/Table/index.module.less";
import {crmBusinessDetailedAdd} from '@/pages/Crm/business/crmBusinessDetailed/crmBusinessDetailedUrl';
import Breadcrumb from "@/components/Breadcrumb";
import {erpPackageTableDelete, erpPackageTableList} from '@/pages/Erp/packageTable/packageTableUrl';
import CheckButton from '@/components/CheckButton';
import ErpPackageEdit from '../packageEdit';
import styles from './index.module.scss';
import useRequest from '../../../../util/Request/useRequest';
import {erpPackageDelete, erpPackageList} from '../packageUrl';
import * as SysField from '../packageField';
import Table from "@/components/Table";



const {Column} = AntTable;
const {FormItem} = Form;

const ErpPackageList = (props) => {

  const {choose} = props;

  const ref = useRef(null);
  const tableRef = useRef(null);
  const packageRef = useRef(null);
  // const [data, setData] = useState();
  const [PackageId, setPackageId] = useState();
  const [ids, setIds] = useState([]);

  const {daGet,run} = useRequest(erpPackageTableList,{manual:true});
  // const {daDelete,runDelete} = useRequest(erpPackageTableDelete,{manual:true});
  const {run:select} = useRequest(erpPackageTableList,
    {manual: true,
      onError: (error) => {
        message.error(error.message);
      },
      onSuccess: (response) => {
        response.map(value => {
          return add({
            data:{
              businessId: props.businessId,
              itemId: value.itemId,
              salePrice: 0,
              totalPrice: 0,
              quantity: 0
            }
          });
        });
        props.onSuccess();
      }
    });

  const {run:add} = useRequest(crmBusinessDetailedAdd,{manual:true});

  let disabled = true;
  if(props.disabled === undefined){
    disabled = true;
  }else{
    disabled = false;
  }

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="套餐名称" name="productName" component={SysField.productName}/>

      </>
    );
  };
  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      url: '/',
      method: 'POST'
    }} value={ids}>批量删除</DelButton>);
  };

  return (
    <>
      <div  className={style.tableWarp}>
        <div className={style.listHeader}>
          <div className="title"><Breadcrumb /></div>
          <div className="actions">
            <div className="button">{actions()}</div>
          </div>
        </div>
        <div className={styles.wrap}>
          <div className={styles.col}>
            <Table
              api={erpPackageList}
              rowKey="packageId"
              searchForm={searchForm}
              // actions={actions()}
              ref={tableRef}
              listHeader={false}
              footer={footer}
            >
              <Column title="套餐名称" width={500} dataIndex="productName" render={(value, record) => {
                return (
                  <Button type="link" onClick={() => {
                    setPackageId(record.packageId);
                  }}>{record.productName}</Button>
                );
              }} sorter/>
              <Column/>
              <Column title="操作" fixed='right' width={200} align="right" render={(value, record) => {
                return (
                  <>
                    {choose ? <CheckButton onClick={()=>{
                      choose(record);
                      props.onSuccess();
                    }} /> : null}
                    {!disabled&&
                    <CheckButton onClick={() => {
                      select({data:{packageId:record.packageId}});
                    }}/>}
                    <EditButton onClick={() => {
                      ref.current.open(record.packageId);
                    }}/>
                    <DelButton api={erpPackageDelete} value={record.packageId} onSuccess={()=>{
                      run(record.packageId);
                      tableRef.current.refresh();
                    }}/>
                  </>
                );
              }} />
            </Table>

            <Modal2 width={900}  title="套餐" component={ErpPackageEdit}  onSuccess={() => {
              tableRef.current.refresh();
              ref.current.close();
            }} ref={ref} />
          </div>
          <div className={styles.col}>
            <TableList packageId = {PackageId === undefined ? 111 : PackageId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ErpPackageList;
