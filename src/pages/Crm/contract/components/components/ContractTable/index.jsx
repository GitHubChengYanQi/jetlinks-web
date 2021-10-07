/**
 * 合同表列表页
 *
 * @author
 * @Date 2021-07-21 13:36:21
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, notification, Modal as AntModal, Table as AntTable, Tag, Divider} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contractBatchDelete, contractDelete, contractEdit, contractList,} from '../../../ContractUrl';
import * as SysField from '../../../ContractField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import AddContractEdit from '@/pages/Crm/contract/ContractEdit';
import Contract from '@/pages/Crm/contract/components/components/Contract';
import {MegaLayout} from '@formily/antd-components';
import {createFormActions, FormButtonGroup, Submit} from '@formily/antd';
import {ExclamationCircleOutlined, SearchOutlined} from '@ant-design/icons';
import BadgeState from '@/pages/Crm/customer/components/BadgeState';
import Icon from '@/components/Icon';
import {useBoolean} from 'ahooks';
import {useRequest} from '@/util/Request';
import {useHistory} from 'ice';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const ContractTable = (props) => {

  const {state, customerId, ...other} = props;

  const history = useHistory();

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
            customerId ?
              null
              :
              <FormItem
                mega-props={{span: 1}}
                placeholder="甲方"
                value={customerId || null}
                name="partyA"
                component={SysField.CustomerNameListSelect} />
          }
        </>
      );
    };
    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout
          responsive={{s: 1, m: 2, lg: 2}}
          labelAlign="left"
          layoutProps={{wrapperWidth: 200}}
          grid={search}
          columns={4} full autoRow>
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
            <Button type="link" title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              toggle();
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
            <MegaLayout inline>
              <FormItem hidden name="audit" component={SysField.Name} />
              {
                customerId ?
                  <FormItem
                    mega-props={{span: 1}}
                    placeholder="甲方"
                    hidden
                    value={customerId || ' '}
                    name="partyA"
                    component={SysField.CustomerNameListSelect} /> : null
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

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: type === 'success' ? '审核成功！' : '已审核！',
    });
  };

  const {run} = useRequest(contractEdit, {
    manual: true, onSuccess: () => {
      openNotificationWithIcon('success');
      tableRef.current.refresh();
    }
  });


  function confirmOk(record) {
    AntModal.confirm({
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
      {customerId && <Divider orientation="right">
        <AddButton ghost onClick={() => {
          ref.current.open(false);
        }} />
      </Divider>}
      <Table
        headStyle={{display: customerId && 'none'}}
        title={<Breadcrumb />}
        api={contractList}
        actions={actions()}
        rowKey="contractId"
        isModal={false}
        searchForm={searchForm}
        ref={tableRef}
        footer={footer}
        formActions={formActionsPublic}
        SearchButton={Search()}
        layout={search}
        onChange={(value) => {
          setIds(value);
        }}
        {...other}
      >
        <Column title="合同名称" fixed dataIndex="name" render={(text, record) => {
          return (
            <Button
              style={{width: '100%', textAlign: 'left', cursor: 'pointer', height: '100%'}}
              title="点击进入合同详情"
              type="link"
              onClick={() => {
                history.push(`/CRM/contract/${record.contractId}`);
              }}>{text}</Button>
          );
        }} />
        <Column title="甲方信息" dataIndex="partAName" render={(text, record) => {
          return (
            <div title="点击进入甲方详情" style={{cursor: 'pointer'}} onClick={() => {
              history.push(`/CRM/customer/${record.partyA}`);
            }}>
              <strong>{record.partA ? record.partA.customerName : null}</strong>
              <div>
                <em>联系人：{record.partyAContacts ? record.partyAContacts.contactsName : '--'}</em>&nbsp;&nbsp;/&nbsp;&nbsp;
                <em>电话：{record.phoneA ? record.phoneA.phoneNumber : '--'}</em></div>
              <div>
                <em>{record.partyAAdress ? record.partyAAdress.location : '---'}</em>
              </div>
            </div>
          );
        }} />
        <Column title="乙方信息" dataIndex="partAName" render={(text, record) => {
          return (
            <div title="点击进入乙方详情" style={{cursor: 'pointer'}} onClick={() => {
              history.push(`/CRM/customer/${record.partyB}`);
            }}>
              <strong>{record.partB ? record.partB.customerName : null}</strong>
              <div>
                <em>联系人：{record.partyBContacts ? record.partyBContacts.contactsName : '--'}</em>&nbsp;&nbsp;/&nbsp;&nbsp;
                <em>电话：{record.phoneB ? record.phoneB.phoneNumber : '--'}</em></div>
              <div>
                <em>{record.partyAAdress ? record.partyAAdress.location : '---'}</em>
              </div>
            </div>
          );
        }} />
        <Column title="创建时间" width={200} dataIndex="createTime" sorter />
        <Column title="审核" width={120} align="left" render={(value, record) => {
          return (
            <BadgeState state={record.audit} text={['未审核', '已审核']} color={['red', 'green']} />
          );
        }} />
        <Column title="操作" fixed="right" align="right" render={(value, record) => {
          return (
            <>
              {record.audit === 0 ?
                <>
                  <Button style={{margin: '0 10px'}} onClick={() => {
                    confirmOk(record);
                  }}>
                    <Icon type="icon-shenhe" />
                    审核
                  </Button>
                  <EditButton
                    onClick={() => {
                      ref.current.open(record);
                    }} />
                  <DelButton api={contractDelete} value={record.contractId} onSuccess={() => {
                    tableRef.current.submit();
                  }} />
                </> : null}
            </>
          );
        }} width={200} />
      </Table>
      <Modal width="auto" title="合同" component={AddContractEdit} customerId={customerId} onSuccess={() => {
        tableRef.current.submit();
        ref.current.close();
      }} ref={ref} />
      <Modal width={1200} component={Contract} onSuccess={() => {
        tableRef.current.submit();
        content.current.close();
      }} ref={content} />
    </>
  );
};

export default ContractTable;
