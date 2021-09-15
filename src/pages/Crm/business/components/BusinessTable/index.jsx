/**
 * 项目管理列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Modal, Spin, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import {
  businessBatchDelete,
  businessDelete,
  businessList,
} from '@/pages/Crm/business/BusinessUrl';
import * as SysField from '@/pages/Crm/business/BusinessField';
import {useHistory} from 'ice';
import BusinessEdit from '@/pages/Crm/business/BusinessEdit';
import {FormButtonGroup, Submit} from '@formily/antd';
import {LeftOutlined, SearchOutlined} from '@ant-design/icons';
import {MegaLayout} from '@formily/antd-components';
import Icon from '@/components/Icon';
import BusinessAdd from '@/pages/Crm/business/BusinessAdd';
import BusinessComplete from '@/pages/Crm/business/BusinessAdd/components/businessComplete';
import TableDetail from '@/pages/Crm/business/BusinessEdit/components/TableDetail';
import styles from '@/pages/Crm/business/BusinessAdd/index.module.scss';
import CustomerDetail from '@/pages/Crm/business/BusinessDetails';

const {Column} = AntTable;
const {FormItem} = Form;

const BusinessTable = (props) => {

  const {status, state} = props;

  const [ids, setIds] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [disable, setDisable] = useState(1);
  const [widths, setWidth] = useState(800);
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);
  const [title, setTitle] = useState('添加项目');

  const history = useHistory();

  const ref = useRef(null);
  const tableRef = useRef(null);
  const addRef = useRef(null);
  const [detail, setDetail] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    setShow(true);
    setShow1(true);
    if (status || state) {
      tableRef.current.formActions.setFieldValue('salesId', status ? status[0] : '');
      tableRef.current.formActions.setFieldValue('originId', state ? state[0] : '');
      tableRef.current.submit();
    }
  }, [status, state]);


  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          addRef.current.open();
        }} />
        {/*<AddButton onClick={() => {*/}
        {/*  ref.current.open(false);*/}
        {/*}} />*/}
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
          <FormItem mega-props={{span: 1}} placeholder="客户名称" name="customerId" component={SysField.CustomerListSelect} />
          <FormItem mega-props={{span: 1}} placeholder="负责人" name="person" component={SysField.PersonListSelect} />
          <FormItem mega-props={{span: 1}} placeholder="立项日期" name="time" component={SysField.TimeListSelect2} />

        </>
      );
    };

    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout responsive={{s: 1, m: 2, lg: 2}} labelAlign="left" layoutProps={{wrapperWidth: 200}} grid={search} columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="项目名称" name="businessName"  component={SysField.BusinessNameListSelect} />
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
            <Button title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
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
            </MegaLayout>
          </FormButtonGroup>

        </MegaLayout>
      </>
    );
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
      >
        <Column
          title="项目名称"
          dataIndex="businessName"
          sorter
          fixed
          showSorterTooltip={false}
          sortDirections={['ascend', 'descend']}
          render={(text, record, index) => {
            return (
              <Button type="link" onClick={() => {
                history.push(`/CRM/business/${record.businessId}`);
              }}>{text}</Button>
            );
          }} />
        <Column
          title="客户名称"
          dataIndex="customerName"
          showSorterTooltip={false}
          sortDirections={['ascend', 'descend']}
          render={(value, record) => {
            return (
              <div>
                {
                  record.customer ? record.customer.customerName : null
                }
              </div>
            );
          }} />
        <Column title="销售流程" width={150} dataIndex="salesId" render={(value, record) => {
          return (
            <div>
              {
                record.sales ? record.sales.name : null
              }
            </div>
          );
        }} />
        <Column title="负责人" width={120} align="center" dataIndex="person" render={(value, record) => {
          return (
            <div>
              {
                record.user ? record.user.name : null
              }
            </div>
          );
        }} />
        <Column
          title="立项日期"
          width={200}
          dataIndex="time"
          sorter
          showSorterTooltip={false}
          defaultSortOrder="descend"
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
        {/*<Column*/}
        {/*  title="商机阶段"*/}
        {/*  width={120}*/}
        {/*  align="center"*/}
        {/*  dataIndex="stage"*/}
        {/*  sorter*/}
        {/*  showSorterTooltip={false}*/}
        {/*  sortDirections={['ascend', 'descend']} />*/}
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
                // ref.current.open(record.businessId);
                setBusinessId(record.businessId);
                setWidth(800);
                setDisable(1);
                // addRef.current.open(record.businessId);
                setDetail(true);
                setShow(false);
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
        onSuccess={() => {
          addRef.current.close();
        }}
        onClose={() => {
          addRef.current.close();
        }}
      />
      <Modal2 width={800} title="项目" component={BusinessEdit} onSuccess={() => {
        setDetail(true);
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal
        title={title}
        visible={detail}
        footer={false}
        width={widths}
        className={styles.myModal}
        onCancel={() => {
          setDetail(false);
          setShow(true);
        }} onOk={() => {
          setDetail(false);
        }}>
        <div style={disable === 1 ? {marginRight: 10, maxHeight:'500px', animationDelay: '-1s'} : {display: 'none', animationDelay: '-1s'}}>
          <Spin spinning={show} delay={400} style={{backgroundColor:'aliceblue',width: '100%'}}>
            <BusinessEdit
              onSuccess={()=>{
                setWidth(400);
                setDisable(2);
                setShow1(false);
                setTitle('创建结果');
              }}
              value={businessId}
            />
          </Spin>
        </div>
        <div style={disable === 2 ? {marginRight: 10, maxHeight:'500px', animationDelay: '-1s'} : {display: 'none', animationDelay: '-1s'}}>
          <Spin spinning={show1} delay={400} style={{backgroundColor:'aliceblue',width: '100%'}}>
            {businessId && <BusinessComplete result={businessId} disabled={false}/>}
          </Spin>
        </div>
        {/*<div style={disable === 3 ? {marginRight: 10, animationDelay: '-1s'} : {display: 'none', animationDelay: '-1s'}}>*/}
        {/*  <Spin spinning={show2} delay={500} style={{backgroundColor:'aliceblue',width: '100%', height: height()}}>*/}
        {/*    /!*{businessId && <TableDetail  title='商机明细' value={businessId} style={{backgroundColor:'aliceblue',width: '100%'}}*!/*/}
        {/*    /!*  onChange={(disable)=>{*!/*/}
        {/*    /!*    setDisable(disable);*!/*/}
        {/*    /!*    setWidth(400);*!/*/}
        {/*    /!*  }}/>}*!/*/}
        {/*    <div style={{ height: height(), overflow: 'auto'}}>*/}
        {/*      <CustomerDetail value={businessId}*/}
        {/*        showFlag={false}*/}
        {/*        onChange={(disable)=>{*/}
        {/*          setDisable(disable);*/}
        {/*          // setWidth(400);*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </Spin>*/}
        {/*</div>*/}
      </Modal>
    </>
  );
};

export default BusinessTable;


