/**
 * 产品属性表列表页
 *
 * @author song
 * @Date 2021-10-18 11:28:39
 */

import React, {useRef} from 'react';
import {Button, Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import Table from '@/components/Table';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {itemAttributeDelete, itemAttributeList} from '../itemAttributeUrl';
import ItemAttributeEdit from '../itemAttributeEdit';
import * as SysField from '../itemAttributeField';
import Breadcrumb from '@/components/Breadcrumb';
import AttributeValuesList from '@/pages/Erp/attributeValues/attributeValuesList';
import Modal from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const ItemAttributeList = (props) => {

  const {value} = props;

  const ref = useRef(null);
  const refValues = useRef(null);
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

  const searchForm = () => {
    return (
      <>
        <FormItem label="配置项名称" style={{width: 200}} name="attribute" component={SysField.attribute} />
        <FormItem hidden name="categoryId" value={value || '111'} component={SysField.Version} />
      </>
    );
  };

  return (
    <>
      <Table
        contentHeight
        title={<Breadcrumb title="配置项管理" />}
        api={itemAttributeList}
        listHeader={false}
        formActions={formActionsPublic}
        rowKey="attributeId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="配置项名称" dataIndex="attribute" render={(value, record) => {
          return (
            <Button type="link" onClick={() => {
              refValues.current.open(record.attributeId);
            }}>
              {value}
            </Button>
          );
        }} />

        <Column dataIndex="standard" title="标配" render={(value) => {
          return <>
            {value ? '是' : '否'}
          </>;
        }} />
        <Column dataIndex="sort" title="排序" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.attributeId);
              }} />
              <DelButton api={itemAttributeDelete} value={record.attributeId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="配置项" component={ItemAttributeEdit} categoryId={value} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal width={800} title="值" component={AttributeValuesList} onSuccess={() => {
        tableRef.current.refresh();
        refValues.current.close();
      }} ref={refValues} />
    </>
  );
};

export default ItemAttributeList;
