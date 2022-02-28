/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef} from 'react';
import {Button, Space, Switch} from 'antd';
import ProCard from '@ant-design/pro-card';
import {ClockCircleOutlined} from '@ant-design/icons';
import {useHistory} from 'ice';
import { partsList} from '../PartsUrl';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import EditButton from '@/components/EditButton';
import AddButton from '@/components/AddButton';
import PartsOldList from '@/pages/Erp/parts/components/PartsOldList';
import PartsEdit from '@/pages/Erp/parts/PartsEdit';
import BackSkus from '@/pages/Erp/sku/components/BackSkus';
import Table from '@/components/Table';
import * as SysField from '../PartsField';
import Form from '@/components/Form';

const {Column} = Table;
const {FormItem} = Form;

const PartsList = ({spuId, type = 1,category}) => {

  const refAdd = useRef();
  const formRef = useRef();
  const tableRef = useRef();

  const history = useHistory();

  const refOldList = useRef();

  const action = () => {
    return (
      <AddButton onClick={() => {
        refAdd.current.open(false);
      }} />
    );
  };

  const searchForm = () => {

    return (
      <>
        <FormItem
          label="物料"
          placeholder="请选择物料"
          name="skuId"
          component={SysField.SkuId} />
        <FormItem
          hidden
          placeholder="请选择物料"
          name="spuId"
          value={spuId}
          component={SysField.PartName} />
        <FormItem
          hidden
          placeholder="请选择物料"
          name="type"
          value={type}
          component={SysField.PartName} />
      </>
    );
  };

  const table = () => {
    return <Table
      headStyle={{display:spuId && 'none'}}
      title={<Breadcrumb title="物料清单" />}
      actions={action()}
      noRowSelection
      api={partsList}
      rowKey="partsId"
      tableKey="parts"
      searchForm={searchForm}
      ref={tableRef}
    >
      <Column title="物料" key={1} dataIndex="skuId" render={(value, record) => {
        return (<Button type="link" onClick={async () => {
          history.push(`/SPU/parts/show?id=${record.partsId}&type=${type}`);
        }}>
          <BackSkus record={record} />
        </Button>);
      }} />
      <Column title="数量" key={2} dataIndex="number" render={(value) => {
        return <>{value || null}</>;
      }} />
      <Column title="备注" key={3} dataIndex="note" />
      <Column title="名称" key={4} dataIndex="partName" />
      <Column title="创建时间" key={5} dataIndex="createTime" render={(value, record) => {
        return !record.partsDetailId && <>{value}</>;
      }} />
      <Column title="创建人" key={6} dataIndex="userResult" render={(value) => {
        return <>{value && value.name}</>;
      }} />

      <Column title="操作" key={7} fixed="right" align="center" width={200} render={(value, record) => {
        return <Space>
          <>
            {
              type === 2 && !record.partsDetailId &&
              <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={false} />
            }
            <EditButton onClick={() => {
              refAdd.current.open(record.id || record.partsId);
            }} />
            <Button icon={<ClockCircleOutlined />} type="link" onClick={() => {
              refOldList.current.open(record.skuId);
            }} />
          </>
        </Space>;
      }} />
    </Table>;
  };

  return (
    <>
      {spuId ?
        <ProCard className="h2Card" title="清单列表" headerBordered extra={action()}>
          {table()}
        </ProCard>
        :
        table()
      }
      <Modal
        width={900}
        type={type}
        title="清单"
        category={category}
        compoentRef={formRef}
        component={PartsEdit}
        onSuccess={() => {
          tableRef.current.submit();
          refAdd.current.close();
        }}
        ref={refAdd}
        spuId={spuId}
        footer={<>
          <Button type="primary" onClick={() => {
            formRef.current.submit();
          }}>保存</Button>
        </>}
      />

      <Modal width={1200} title="清单" type={type} component={PartsOldList} onSuccess={() => {
        refOldList.current.close();
      }} ref={refOldList} spuId={spuId} />
    </>
  );
};

export default PartsList;
