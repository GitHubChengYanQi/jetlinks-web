/**
 * 物品分类表列表页
 *
 * @author
 * @Date 2021-10-18 10:54:16
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {categoryDelete, categoryDeleteBatch, categoryList} from '../categoryUrl';
import CategoryEdit from '../categoryEdit';
import * as SysField from '../categoryField';
import Modal from '@/components/Modal';
import ItemAttributeList from '@/pages/Erp/itemAttribute/itemAttributeList';
import {createFormActions} from '@formily/antd';
import Breadcrumb from '@/components/Breadcrumb';
import {categoryTree} from '@/pages/Erp/spu/spuUrl';
import {spuClassificationdeleteBatch} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';

const {Column} = AntTable;
const {FormItem} = Form;
const formActionsPublic = createFormActions();

const CategoryList = () => {
  const ref = useRef(null);
  const refAttribute = useRef(null);
  const tableRef = useRef(null);


  const [ids, setIds] = useState([]);

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
        <FormItem label="配置名称" name="categoryName" component={SysField.CategoryName} />
      </>
    );
  };

  const footer = () => {
    return <DelButton value={ids} disabled={ids.length === 0} api={categoryDeleteBatch} onSuccess={() => {
      tableRef.current.submit();
    }}>批量删除</DelButton>;
  };


  return (
    <div style={{padding: 16}}>
      <Table
        title={<Breadcrumb title="配置管理" />}
        api={categoryTree}
        contentHeight
        noSort
        formActions={formActionsPublic}
        rowKey="key"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        footer={footer}
        onChange={(value) => {
          setIds(value);
        }}
      >
        <Column title="配置名称" dataIndex="title" render={(value, record) => {
          if (record.children && record.children.length === 0) {
            record.children = null;
          }
          return (
            <>
              {
                value
              }
            </>
          );
        }} />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.key);
              }} />
              <DelButton api={categoryDelete} value={record.categoryId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="配置" component={CategoryEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal width={800} title="配置项" component={ItemAttributeList} onSuccess={() => {
        tableRef.current.refresh();
        refAttribute.current.close();
      }} ref={refAttribute} />
    </div>
  );
};

export default CategoryList;
