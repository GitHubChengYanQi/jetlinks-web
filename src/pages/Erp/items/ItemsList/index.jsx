/**
 * 产品表列表页
 *
 * @author
 * @Date 2021-07-14 14:04:26
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, message, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {useRequest} from "@/util/Request";
import Modal2 from '@/components/Modal';
import Breadcrumb from '@/components/Breadcrumb';
import CheckButton from "@/components/CheckButton";
import {erpPackageTableAdd} from "@/pages/Erp/erpPackageTable/erpPackageTableUrl";
import {crmBusinessDetailedAdd} from "@/pages/Crm/business/crmBusinessDetailed/crmBusinessDetailedUrl";
import PartsList from "@/pages/Erp/parts/PartsList";
import {itemsDelete, itemsList} from '../ItemsUrl';
import ItemsEdit from '../ItemsEdit';
import * as SysField from '../ItemsField';

const {Column} = AntTable;
const {FormItem} = Form;

const ItemsList = (props) => {

  const {item} = props;

  const ref = useRef(null);
  const tableRef = useRef(null);
  const listRef = useRef(null);
  const [ids, setIds] = useState([]);
  const [itemsId, setItemsId] = useState([]);

  const { run: add} = useRequest(erpPackageTableAdd, {
    manual: true,
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      ref.current.close();
      props.onSuccess();
    }
  });

  const { run: addTc} = useRequest(crmBusinessDetailedAdd, {
    manual: true,
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      ref.current.close();
      props.onSuccess();
    }
  });

  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      url: '/',
      method: 'POST'
    }} value={ids}>批量删除</DelButton>);
  };
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  let disabled = true;
  if(props.disabled === undefined){
    disabled = true;
  }else{
    disabled = false;
  }

  let TcDisabled = true;
  if(props.TcDisabled === undefined){
    TcDisabled = true;
  }else{
    TcDisabled = false;
  }

  const [search,setSearch] = useState(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} label="生产日期" name="productionTime" component={SysField.ProductionTime} />
          <FormItem mega-props={{span: 1}} label="重要程度" name="important" component={SysField.Name} />
          <FormItem mega-props={{span: 1}} label="产品重量" name="weight" component={SysField.Name} />
          <FormItem mega-props={{span: 1}} label="材质" name="materialName" component={SysField.Name} />
          <FormItem mega-props={{span: 1}} label="易损" name="vulnerability" component={SysField.Name} />
        </>
      );
    };

    return (
      <>
        <MegaLayout labelAlign="left" labelWidth={120} wrapperWidth={200} grid columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} label="产品名称" name="name" component={SysField.Name} />
          {search ? formItem() : null}
          <MegaLayout>
            <Submit style={{width: 100}}><SearchOutlined />查询</Submit>
            <Button style={{width: 100}} onClick={() => {
              if (search) {
                setSearch(false);
              } else {
                setSearch(true);
              }
            }}>高级搜索</Button>
          </MegaLayout>
        </MegaLayout>
        <FormItem label="产品名称" name="name" component={SysField.Name} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={itemsList}
        rowKey="itemId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        Search
        layout
        onChange={(keys)=>{
          setIds(keys);
        }}
        footer={footer}
      >
        <Column title="产品名字" dataIndex="name" sorter
          render={(value, row) => {
            return (
              <Button type="link" onClick={() => {
                setItemsId(row.itemId);
                listRef.current.open(false);
              }}>{row.name}</Button>
            );
          }}/>

        <Column title="质保期" dataIndex="shelfLife" sorter/>
        <Column title="产品库存" dataIndex="inventory" sorter/>
        <Column title="生产日期" dataIndex="productionTime" sorter/>
        <Column title="重要程度" dataIndex="important" sorter/>
        <Column title="产品重量" dataIndex="weight" sorter/>
        <Column title="材质" dataIndex="materialName" sorter/>
        <Column title="成本" dataIndex="cost" />
        <Column title="易损" dataIndex="vulnerability" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              {item ? <CheckButton onClick={()=>{
                item(record);
                props.onSuccess();
              }} /> : null}
              {!disabled&&
              <CheckButton onClick={() => {
                add(
                  {
                    data: {
                      packageId: props.packageId,
                      itemId: record.itemId,
                      salePrice: 0,
                      totalPrice: 0,
                      quantity: 0
                    }
                  }
                );

              }}/>}
              {!TcDisabled&&
              <CheckButton onClick={() => {
                addTc(
                  {
                    data: {
                      businessId: props.businessId,
                      itemId: record.itemId,
                      salePrice: 0,
                      totalPrice: 0,
                      quantity: 0
                    }
                  }
                );
              }}/>}
              <EditButton onClick={() => {ref.current.open(record.itemId);}} />
              <DelButton api={itemsDelete} value={record.itemId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal2 width={800} component={ItemsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
      <Modal2 width={1000} component={PartsList} itemsId={itemsId} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={listRef}/>
    </>
  );
};

export default ItemsList;
