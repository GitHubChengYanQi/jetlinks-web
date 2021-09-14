/**
 * 合同表列表页
 *
 * @author
 * @Date 2021-07-21 13:36:21
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Modal, notification, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contractBatchDelete, contractDelete, contractEdit, contractList,} from '../../../ContractUrl';
import * as SysField from '../../../ContractField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import AddContractEdit from '@/pages/Crm/contract/ContractEdit';
import Contract from '@/pages/Crm/contract/ContractList/components/Contract';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {ExclamationCircleOutlined, SearchOutlined} from '@ant-design/icons';
import BadgeState from '@/pages/Crm/customer/components/BadgeState';
import Icon from '@/components/Icon';
import {useBoolean} from 'ahooks';
import {useRequest} from '@/util/Request';

const {Column} = AntTable;
const {FormItem} = Form;

const ContractTable = (props) => {

  const {state,customerId} = props;


  const ref = useRef(null);
  const content = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    if (state) {
      tableRef.current.formActions.setFieldValue('audit', state ? state[0] : null);
      tableRef.current.refresh();
    }
  }, [state]);

  const [search, {toggle}] = useBoolean(false);


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
          <FormItem mega-props={{span: 1}} placeholder="乙方" name="partyB" component={SysField.CustomerNameListSelect} />
          {
            customerId ? null :  <FormItem mega-props={{span: 1}} placeholder="甲方"  value={customerId || null} name="partyA" component={SysField.CustomerNameListSelect} />
          }
        </>
      );
    };
    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout responsive={{s: 1, m: 2, lg: 2}} labelAlign="left" layoutProps={{wrapperWidth: 200}} grid={search} columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="合同名称" name="name" component={SysField.Name} />
          {search ? formItem() : null}
        </MegaLayout>
      </div>
    );
  };

  const Search = () => {
    return (
      <div style={{width: 800}}>
        <MegaLayout>
          <FormButtonGroup>
            <Submit><SearchOutlined />查询</Submit>
            <Button title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              toggle();
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
            <MegaLayout inline>
              <FormItem hidden name="audit" component={SysField.Name} />
              {
                customerId ?  <FormItem mega-props={{span: 1}} placeholder="甲方"  hidden value={customerId || null} name="partyA" component={SysField.CustomerNameListSelect} /> : null
              }
            </MegaLayout>
          </FormButtonGroup>
        </MegaLayout>
      </div>
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

  const {run} = useRequest(contractEdit, {
    manual: true, onSuccess: () => {
      openNotificationWithIcon('success');
      tableRef.current.refresh();
    }
  });

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: type === 'success' ? '审核成功！' : '已审核！',
    });
  };

  function confirmOk(record) {
    Modal.confirm({
      title: '审核',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      content: `确认审核`,
      okText: '确认',
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        await run(
          {
            data: {
              contractId: record.contractId,
              audit: 1,
            }
          }
        );
      }
    });
  }

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={contractList}
        actions={actions()}
        rowKey="contractId"
        isModal={false}
        searchForm={searchForm}
        ref={tableRef}
        footer={footer}
        SearchButton={Search()}
        layout={search}
        onChange={(value) => {
          setIds(value);
        }}
      >
        <Column title="合同名称" fixed dataIndex="name" render={(text, record) => {
          return (
            <Button size="small" type="link" onClick={() => {
              content.current.open(record.contractId);
            }}>{text}</Button>
          );
        }} />
        <Column title="甲方" dataIndex="partAName" render={(text,record)=>{
          return (
            <>
              {
                record.partA ? record.partA.customerName : null
              }
            </>
          );
        }} />
        <Column title="甲方联系人" align="center" width={120} dataIndex="partyAContactsId" render={(text,record)=>{
          return (
            <>
              {
                record.partyAContacts ? record.partyAContacts.contactsName : null
              }
            </>
          );
        }} />
        <Column title="甲方联系人电话" width={200} dataIndex="partyAPhone" render={(text,record)=>{
          return (
            <>
              {
                record.phoneA ? record.phoneA.phoneNumber : null
              }
            </>
          );
        }} />
        <Column title="甲方地址"  dataIndex="partyAAdressId" render={(text,record)=>{
          return (
            <>
              {
                record.partyAAdress ? record.partyAAdress.location : null
              }
            </>
          );
        }} />
        <Column title="乙方" dataIndex="partBName" render={(text,record)=>{
          return (
            <>
              {
                record.partB ? record.partB.customerName : null
              }
            </>
          );
        }} />
        <Column title="乙方联系人" align="center" width={120} dataIndex="partyBContactsId" render={(text,record)=>{
          return (
            <>
              {
                record.partyBContacts ? record.partyBContacts.contactsName : null
              }
            </>
          );
        }} />
        <Column title="乙方联系人电话" width={200} dataIndex="partyBPhone" render={(text,record)=>{
          return (
            <>
              {
                record.phoneB ? record.phoneB.phoneNumber : null
              }
            </>
          );
        }} />
        <Column title="乙方地址" dataIndex="partyBAdressId" render={(text,record)=>{
          return (
            <>
              {
                record.partyBAdress ? record.partyBAdress.location : null
              }
            </>
          );
        }} />
        <Column title="创建时间" width={200} dataIndex="time" sorter />
        <Column title="审核" width={120} align="left" render={(value, record) => {
          return (
            <BadgeState state={record.audit} text={['未审核', '已审核']} color={['red', 'green']} />
          );
        }} />
        <Column title="操作" fixed='right' align="right" render={(value, record) => {
          return (
            <>
              {record.audit === 0 ? <Button style={{margin: '0 10px'}} onClick={() => {
                confirmOk(record);
              }}><Icon type="icon-shenhe" />审核</Button> : null}
              <EditButton onClick={() => {
                ref.current.open(record);
              }} />
              <DelButton api={contractDelete} value={record.contractId} onSuccess={() => {
                tableRef.current.submit();
              }} />
            </>
          );
        }} width={200} />
      </Table>
      <Modal2 title="合同" component={AddContractEdit} onSuccess={() => {
        tableRef.current.submit();
        ref.current.close();
      }} ref={ref} />
      <Modal2 component={Contract} onSuccess={() => {
        tableRef.current.submit();
        content.current.close();
      }} ref={content} />
    </>
  );
};

export default ContractTable;
