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
import {stockList} from '../../StockUrl';
import * as SysField from '../../StockField';
import Modal from '@/components/Modal';
import AddItem from '@/pages/Crm/business/BusinessEdit/components/AddItem';
import SelButton from '@/components/SelButton';


const {Column} = AntTable;
const {FormItem} = Form;
const formActionsPublic = createFormActions();
const StockTable = (props) => {

  const {choose, state,...other} = props;
  const tableRef = useRef(null);
  const modalRef = useRef(null);
  const history = useHistory();
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
    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="品牌" name="brandId" component={SysField.BrandId} />
        </>
      );
    };

    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout responsive={{s: 1, m: 2, lg: 2}} labelAlign="left" layoutProps={{wrapperWidth: 200}} grid={search}
          columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="产品名称" name="itemId" component={SysField.ItemId} />

          {search ? formItem() : null}
        </MegaLayout>
      </div>
    );
  };

  const Search = () => {
    return (
      <>
        <MegaLayout>
          <FormButtonGroup>
            <Submit><SearchOutlined />查询</Submit>
            <Button type='link' title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              toggle();
            }}> <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
            <MegaLayout inline>
              <FormItem hidden  name="storehouseId" value={state} component={SysField.Storehouse} />
            </MegaLayout>
          </FormButtonGroup>
        </MegaLayout>
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
        api={stockList}
        isModal={false}
        rowSelection={TcDisabled}
        formActions={formActionsPublic}
        SearchButton={Search()}
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
        <Column title="品牌"  width={200} render={(text, record) => {
          return (
            <>
              {record.brandResult.brandName}
            </>
          );
        }} sorter />
        <Column title="仓库名称" style={{maxWidth:200}} fixed  render={(text, record) => {
          return (
            <>
              <Button type="link" onClick={() => {
                history.push({pathname:`/ERP/stockDetails/${record.itemsResult.itemId}`,
                  params:{storehouseId: record.storehouseId,brandId:record.brandId,itemId:record.itemId}});
              }}>{record.storehouseResult.name}</Button>
            </>
          );
        }} sorter />
        <Column title="数量" width={120} align='center' sorter dataIndex="inventory" />
        <Column />
        {choose ? <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <CheckButton onClick={() => {
                choose(record);
                props.onSuccess();
              }} />
            </>
          );
        }} width={300} /> : null}

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
        onClose={()=>{
        }}
        component={AddItem}
        businessId={props.businessId}
        onSuccess={() => {
          props.onSuccess();
        }}
      />
    </>
  );
};

export default StockTable;
