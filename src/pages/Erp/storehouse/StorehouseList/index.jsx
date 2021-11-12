/**
 * 地点表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import CheckButton from '@/components/CheckButton';
import {batchDelete} from '@/pages/Erp/material/MaterialUrl';
import {useBoolean} from 'ahooks';
import {MegaLayout} from '@formily/antd-components';
import {createFormActions, FormButtonGroup, Submit} from '@formily/antd';
import {ScanOutlined, SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import {storehouseDelete, storehouseList} from '../StorehouseUrl';
import * as SysField from '../StorehouseField';
import StorehouseEdit from '../StorehouseEdit';
import StorehousePositionsList from '@/pages/Erp/storehouse/components/storehousePositions/storehousePositionsList';
import Code from '@/pages/Erp/spu/components/Code';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const StorehouseList = (props) => {

  const {choose} = props;

  const ref = useRef(null);
  const refPosition = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const [search, {toggle}] = useBoolean(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem placeholder="仓库地点" mega-props={{span: 1}} name="palce" component={SysField.Position} />
          <FormItem placeholder="仓库面积" mega-props={{span: 1}} name="measure" component={SysField.Measure} />
          <FormItem placeholder="仓库容量" mega-props={{span: 1}} name="capacity" component={SysField.Capacity} />
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
          <FormItem placeholder="仓库名称" mega-props={{span: 1}} name="name" component={SysField.Name} />
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
              toggle();
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
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
      ...batchDelete
    }} onSuccess={() => {
      tableRef.current.refresh();
    }} value={ids}>批量删除</DelButton>);
  };

  return (
    <>
      <Table
        contentHeight
        title={<Breadcrumb title="仓库管理" />}
        api={storehouseList}
        rowKey="storehouseId"
        searchForm={searchForm}
        actions={actions()}
        formActions={formActionsPublic}
        ref={tableRef}
        footer={footer}
        SearchButton={Search()}
        layout={search}
        onChange={(value) => {
          setIds(value);
        }}
      >
        <Column title="仓库名称" dataIndex="name" sorter render={(value, record) => {
          return (
            <>
              <Code source='storehouse' id={record.storehouseId} />
              <Button type="link" style={{padding:0}} onClick={() => {
                refPosition.current.open(record.storehouseId);
              }}>{value}</Button>
            </>
          );
        }} />
        <Column title="仓库码" width={200} dataIndex="coding" sorter />
        <Column title="地点" dataIndex="palce" sorter />
        <Column title="面积" width={100} align="center" dataIndex="measure" sorter />
        <Column title="容量" width={100} align="center" dataIndex="capacity" sorter />
        <Column title="操作" fixed="right" width={choose ? 200 : 100} align="right" render={(value, record) => {
          return (
            <>
              {choose ? <CheckButton onClick={() => {
                choose(record);
                props.onSuccess();
              }} /> : null}
              <EditButton onClick={() => {
                ref.current.open(record.storehouseId);
              }} />
              <DelButton api={storehouseDelete} value={record.storehouseId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} />
      </Table>
      <Modal width={800} title="仓库" component={StorehouseEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal width={800} title="仓库库位" component={StorehousePositionsList} onSuccess={() => {
        tableRef.current.refresh();
        refPosition.current.close();
      }} ref={refPosition} />
    </>
  );
};

export default StorehouseList;
