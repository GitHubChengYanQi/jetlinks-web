/**
 * 项目管理列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Card, Statistic, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Breadcrumb from '@/components/Breadcrumb';

import {
  businessBatchDelete,
  businessDelete,
  businessList,
} from '@/pages/Crm/business/BusinessUrl';
import * as SysField from '@/pages/Crm/business/BusinessField';
import {useHistory} from 'ice';
import {FormButtonGroup, Submit} from '@formily/antd';
import {ArrowDownOutlined, ArrowUpOutlined, SearchOutlined} from '@ant-design/icons';
import {MegaLayout} from '@formily/antd-components';
import Icon from '@/components/Icon';
import BusinessAdd from '@/pages/Crm/business/BusinessAdd';
import BusinessComplete from '@/pages/Crm/business/BusinessAdd/components/businessComplete';
import Modal from '@/components/Modal';
import Form from '@/components/Form';
import BusinessSteps from '@/pages/Crm/business/BusinessAdd/components/businessSteps';
import styles from '@/pages/Crm/business/BusinessAdd/index.module.scss';
import style from '@/pages/Crm/customer/components/CustomerTable/index.module.scss';

const {Column} = AntTable;
const {FormItem} = Form;

const BusinessTable = (props) => {

  const {status, state, statement, left} = props;

  const [ids, setIds] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [disable, setDisable] = useState(1);
  const history = useHistory();

  const tableRef = useRef(null);
  const addRef = useRef(null);
  const [search, setSearch] = useState(false);
  const submitRef = useRef(null);
  const modelRef = useRef(null);
  const [useData, setData] = useState([]);

  useEffect(() => {
    if (status || state || statement) {
      tableRef.current.formActions.setFieldValue('salesId', status ? status[0] : '');
      tableRef.current.formActions.setFieldValue('originId', state ? state[0] : '');
      tableRef.current.formActions.setFieldValue('state', statement ? statement[0] : '');
      tableRef.current.submit();
    }
  }, [status, state, statement]);


  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          addRef.current.open(false);
        }} />
      </>
    );
  };

  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      ...businessBatchDelete
    }} onSuccess={() => {
      tableRef.current.refresh();
    }} value={ids}>批量删除</DelButton>);
  };


  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="客户名称" name="customerId"
                    component={SysField.CustomerListSelect} />
          <FormItem mega-props={{span: 1}} placeholder="负责人" name="person" component={SysField.PersonListSelect} />
        </>
      );
    };

    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout responsive={{s: 1, m: 2, lg: 2}} labelAlign="left" layoutProps={{wrapperWidth: 200}} grid={search}
                    columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="项目名称" name="businessName"
                    component={SysField.BusinessNameListSelect} />
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
            <Button type="link" title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              if (search) {
                setSearch(false);
              } else {
                setSearch(true);
              }
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
            <MegaLayout inline>
              <FormItem hidden name="originId" component={SysField.BusinessNameListSelect} />
              <FormItem hidden name="salesId" component={SysField.BusinessNameListSelect} />
              <FormItem hidden name="state" component={SysField.BusinessNameListSelect} />
            </MegaLayout>
          </FormButtonGroup>

        </MegaLayout>
      </>
    );
  };
  const width = () => {
    switch (disable) {
      case 1:
        return 650;
      case 2:
        return 360;
      default:
        return 360;
    }
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={businessList}
        rowKey="businessId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        footer={footer}
        isModal={false}
        SearchButton={Search()}
        layout={search}
        onChange={(keys) => {
          setIds(keys);
        }}
        sticky={{
          getContainer: () => {
            return document.getElementById('listLayout');
          }
        }}
        left={left}
      >
        <Column
          title="项目信息"
          dataIndex="businessName"
          fixed
          sortDirections={['ascend', 'descend']}
          render={(text, record) => {
            return (
              <div style={{cursor:'pointer'}} onClick={()=>{
                history.push(`/CRM/business/${record.businessId}`);
              }}>
                <strong>{text}</strong>
                <div><em>
                  {record.customer ? record.customer.customerName : null}
                </em>
                </div>
                <div>
                  <em>负责人：{record.user ? record.user.name : '未填写'}</em>
                </div>
              </div>

            );
          }} />
        <Column title="盈率" width={150} align="center" dataIndex="salesId" render={(value, record) => {
          return (
            <Statistic
              title={record.process && record.process.name || record.sales && record.sales.process.length > 0 && record.sales.process[0].name}
              value={record.process && `${record.process.percentage}` || record.sales && record.sales.process.length > 0 && record.sales.process[0].percentage}
              valueStyle={{color: record.state && (record.state === '赢单' ? '#3f8600' : '#cf1322')}}
              prefix={record.state && (record.state === '赢单' ? <ArrowUpOutlined /> : <ArrowDownOutlined />)}
              suffix="%"
            />
          );
        }} />
        <Column
          title="立项日期"
          width={200}
          dataIndex="time"
          sorter
          sortDirections={['ascend', 'descend']} />
        <Column title="机会来源" width={120} dataIndex="originName" render={(value, record) => {
          return (
            <div>
              {
                record.origin ? record.origin.originName : null
              }
            </div>
          );
        }} />
        <Column
          title="项目金额"
          width={120}
          align="center"
          dataIndex="opportunityAmount"
          sorter
          showSorterTooltip
          sortDirections={['ascend', 'descend']} />
        <Column title="操作" fixed="right" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                setBusinessId(record.businessId);
                setData(record.sales);
                setDisable(1);
                modelRef.current.open(false);
              }} />
              <DelButton api={businessDelete} value={record.businessId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={100} />
      </Table>
      <BusinessAdd
        ref={addRef}
        onClose={() => {
          addRef.current.close();
          tableRef.current.refresh();
        }}
      />
      <Modal
        compoentRef={submitRef}
        ref={modelRef}
        title={<div style={{marginLeft: '45%', display: 'inline'}}>
          {disable === 1 && '添加项目'}
          {disable === 2 && '完成'}
        </div>}
        footer={disable === 1 ? <Button type="primary" onClick={() => {
          submitRef.current.formRef.current.tableRef.current.submit();
        }}
        >
          完成创建
        </Button> : false}
        width={width()}
        className={styles.myModal}
        onClose={() => {
          modelRef.current.close();
          tableRef.current.refresh();
        }}
      >
        {disable === 1 && <BusinessSteps
          useData={useData}
          businessId={businessId}
          ref={submitRef}
          onChange={(result) => {
            if (result.success) {
              setData(null);
              setDisable(2);
            }
          }}
        />}
        {disable === 2 && <BusinessComplete result={businessId} disabled={false} />}
      </Modal>
    </>
  );
};

export default BusinessTable;


