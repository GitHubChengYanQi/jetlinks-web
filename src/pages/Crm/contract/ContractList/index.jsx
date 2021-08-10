/**
 * 合同表列表页
 *
 * @author
 * @Date 2021-07-21 13:36:21
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contractBatchDelete, contractDelete, contractList,} from '../ContractUrl';
import * as SysField from '../ContractField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import AddContractEdit from '@/pages/Crm/contract/ContractEdit';
import Contract from '@/pages/Crm/contract/ContractList/components/Contract';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import BadgeState from '@/pages/Crm/customer/components/BadgeState';
import Icon from '@/components/Icon';

const {Column} = AntTable;
const {FormItem} = Form;

const ContractList = () => {


  const ref = useRef(null);
  const content = useRef(null);
  const tableRef = useRef(null);

  const [search, setSearch] = useState(false);

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="甲方" name="partyA" component={SysField.CustomerNameListSelect} />
          <FormItem mega-props={{span: 1}} placeholder="乙方" name="partyB" component={SysField.CustomerNameListSelect} />
          <FormItem mega-props={{span: 1}} placeholder="审核" name="audit" component={SysField.Audit} />
        </>
      );
    };
    return (
      <>
        <MegaLayout responsive={{s: 1,m:2,lg:2}} labelAlign="left" layoutProps={{wrapperWidth:200}} grid={search} columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="合同名称" name="name" component={SysField.Name} />
          {search ? formItem() : null}
        </MegaLayout>
      </>
    );
  };

  const Search = () => {
    return (
      <>
        <MegaLayout>
          <FormButtonGroup>
            <Submit><SearchOutlined />查询</Submit>
            <Button title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              if (search) {
                setSearch(false);
              } else {
                setSearch(true);
              }
            }}><Icon type={search ? 'icon-shanchuzijiedian' : 'icon-tianjiazijiedian'} /></Button>
            <MegaLayout inline>
              <FormItem hidden name="status" component={SysField.Name} />
              <FormItem hidden name="classification" component={SysField.Name} />
              <FormItem hidden name="customerLevelId" component={SysField.Name} />
            </MegaLayout>
          </FormButtonGroup>
        </MegaLayout>
      </>
    );
  };

  const [ids, setIds] = useState([]);


  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      ...contractBatchDelete
    }} onSuccess={() => {
      tableRef.current.refresh();
    }} value={ids}>批量删除</DelButton>);
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={contractList}
        actions={actions()}
        rowKey="contractId"
        searchForm={searchForm}
        ref={tableRef}
        footer={footer}
        SearchButton={Search()}
        layout={search}
        onChange={(value) => {
          setIds(value);
        }}
      >
        <Column title="合同名称" dataIndex="name" render={(text, record) => {
          return (
            <Button size="small" type="link" onClick={() => {
              content.current.open(record.contractId);
            }}>{text}</Button>
          );
        }} />
        <Column title="甲方" dataIndex="partAName" />
        <Column title="乙方" dataIndex="partBName" />
        <Column title="创建时间" width={200} dataIndex="time" sorter />
        <Column title="审核" width={120} align="left" render={(value, record) => {
          return (
            <BadgeState state={record.audit} text={['不合格', '合格']} color={['red', 'green']} />
          );
        }} />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record);
              }} />
              <DelButton api={contractDelete} value={record.contractId} onSuccess={() => {
                tableRef.current.submit();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal2 width={1500} title="合同" component={AddContractEdit} onSuccess={() => {
        tableRef.current.submit();
        ref.current.close();
      }} ref={ref} />
      <Modal2 width={1500} component={Contract} onSuccess={() => {
        tableRef.current.submit();
        content.current.close();
      }} ref={content} />
    </>
  );
};

export default ContractList;
