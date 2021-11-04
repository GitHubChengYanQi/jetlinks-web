/**
 * 物品分类表列表页
 *
 * @author
 * @Date 2021-10-18 10:54:16
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {categoryDelete, categoryList} from '../categoryUrl';
import CategoryEdit from '../categoryEdit';
import * as SysField from '../categoryField';
import Modal from '@/components/Modal';
import ItemAttributeList from '@/pages/Erp/itemAttribute/itemAttributeList';
import {createFormActions} from '@formily/antd';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;
const formActionsPublic = createFormActions();

const CategoryList = () => {
  const ref = useRef(null);
  const refAttribute = useRef(null);
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
        <FormItem label="配置名称" name="categoryName" component={SysField.CategoryName} />
      </>
    );
  };

  return (
    <div style={{padding:16}}>
      <Table
        title={<Breadcrumb title='配置管理' />}
        api={categoryList}
        contentHeight
        formActions={formActionsPublic}
        rowKey="categoryId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="上级" dataIndex="pid" render={(value,record)=>{
          return (
            <>{record.pidCategoryResult ? record.pidCategoryResult.categoryName : '顶级'}</>
          );
        }} />
        <Column title="配置名称" dataIndex="categoryName" render={(value,record)=>{
          return (
            <Button type='link' onClick={()=>{
              refAttribute.current.open(record.categoryId);
            }}>
              {value}
            </Button>
          );
        }} />
        <Column title="排序" dataIndex="sort" align='center' width={100} />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.categoryId);
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
