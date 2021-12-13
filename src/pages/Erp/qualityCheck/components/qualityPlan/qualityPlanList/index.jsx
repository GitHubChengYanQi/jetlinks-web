/**
 * 质检方案列表页
 *
 * @author Captain_Jazz
 * @Date 2021-10-28 10:29:56
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {qualityPlanDelete, qualityPlanDetail, qualityPlanList} from '../qualityPlanUrl';
import QualityPlanEdit from '../qualityPlanEdit';
import * as SysField from '../qualityPlanField';
import Breadcrumb from '@/components/Breadcrumb';
import {useHistory} from 'ice';
import {Name} from '../qualityPlanField';
import {CopyOutlined} from '@ant-design/icons';
import {request} from '@/util/Request';
import Modal from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;

const QualityPlanList = (props) => {
  const history = useHistory();
  const tableRef = useRef(null);
  const addRef = useRef(null);

  const [ids, setIds] = useState([]);

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          history.push('/production/qualityCheck/add');
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="方案名称" name="planName" component={SysField.Name} />
        <FormItem label="状态" name="planStatus" component={SysField.PlanStatus} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={qualityPlanList}
        rowKey="qualityPlanId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        {...props}
        footer={() => {
          return <Button type="link" disabled={ids.length !== 1} icon={<CopyOutlined />} onClick={async () => {
            const data = await request({...qualityPlanDetail, data: {qualityPlanId: ids[0]}});

            const detail = data && data.qualityPlanDetailParams && data.qualityPlanDetailParams.map((items, index) => {
              return {
                ...items,
                planDetailId: null,
              };
            });

            addRef.current.open({
              ...data,
              planCoding: null,
              planName: null,
              qualityPlanId: null,
              qualityPlanDetailParams: detail
            });
          }}>
            复制添加
          </Button>;
        }
        }
        onChange={(value) => {
          setIds(value);
        }}
      >
        <Column title="方案名称" dataIndex="planName" />
        <Column title="质检类型" dataIndex="planType" render={(value) => {
          switch (value) {
            case '1':
              return <>生产检</>;
            case '2':
              return <>巡检</>;
            default:
              break;
          }
        }} />
        <Column title="检查类型" dataIndex="testingType" render={(value) => {
          switch (value) {
            case '1':
              return <>抽检检查</>;
            case '2':
              return <>固定检查</>;
            default:
              break;
          }
        }} />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                history.push(`/production/qualityCheck/add?id=${record.qualityPlanId}`);
              }} />
              {/*<DelButton api={qualityPlanDelete} value={record.qualityPlanId} onSuccess={() => {*/}
              {/*  tableRef.current.refresh();*/}
              {/*}} />*/}
            </>
          );
        }} width={100} />

      </Table>
      <Modal ref={addRef} width={1200} component={QualityPlanEdit} onSuccess={() => {
        addRef.current.close();
        tableRef.current.submit();
      }} />
    </>
  );
};

export default QualityPlanList;
