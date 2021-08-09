import React, {forwardRef, useImperativeHandle} from 'react';
import {Table as AntdTable} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import Service from '@/util/Service';
import {useFormTableQuery, createFormActions, Form, Submit, FormButtonGroup} from '@formily/antd';

import style from './index.module.less';

const {Column} = AntdTable;

const formActions = createFormActions();

const TableWarp = ({
  children,
  columns,
  actions,
  title,
  api,
  searchForm,
  rowKey,
  Search,
  selectionType,
  onChange,
  footer: parentFooter,
  ...props
}, ref) => {

  if (!api) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }


  if (!rowKey) {
    rowKey = api.rowKey;
  }
  if (!rowKey) {
    console.warn('Table component: rowKey cannot be empty,But now it doesn\'t exist!');
  }


  const {ajaxService} = Service();


  const requestMethod = async (params) => {
    const {values, pagination, sorter, ...other} = params;
    const page = {};
    page.limit = pagination.pageSize;
    page.page = pagination.current;
    let response;
    try {
      response = await ajaxService({
        ...api,
        data: {
          ...values,
          sorter: sorter && {
            field: sorter.field,
            order: sorter.order
          }
        },
        ...other,
        params: page
      });
      return new Promise((resolve) => {
        resolve({
          dataSource: Array.isArray(response.data) ? response.data : [],
          total: response.count,
          current: response.current,
          pageSize: response.pageSize,
        });
      });
    } catch (e) {
      console.warn(e.message);
      return new Promise((resolve, reject) => {
        reject(e.message);
      });
    }
  };

  const {form, table: tableProps} = useFormTableQuery(requestMethod);

  useImperativeHandle(ref, () => ({
    refresh: formActions.submit,
    submit: formActions.submit,
    reset: formActions.reset,
    formActions,
  }));

  const {loading, dataSource, pagination, ...other} = tableProps;

  const footer = () => {
    return (
      <div className={style.footer}>
        {parentFooter && <div className={style.left}>{parentFooter()}</div>}
        {pagination && <div className={style.right}>共{pagination.total}条</div>}
        <br style={{clear: 'both'}} />
      </div>
    );
  };
  return (
    <div className={style.tableWarp}>
      <div className={style.listHeader}>
        {title && <div className="title">{title}</div>}
        <div className="actions">
          {/* <div className="search" style={{ textAlign: title ? 'right' : 'left' }}/> */}
          <div className="button">{actions}</div>
        </div>
      </div>
      {searchForm ? <div className="search">
        <Form
          layout="inline"
          {...form}
          actions={formActions}
        >
          {typeof searchForm === 'function' && searchForm()}
          <FormButtonGroup>
            <Submit><SearchOutlined />查询</Submit>
            {Search || null}
          </FormButtonGroup>
        </Form>
      </div> : <Form
        layout="inline"
        {...form}
        actions={formActions}
      />}
      <AntdTable
        showTotal
        loading={loading}
        dataSource={dataSource || []}
        rowKey={rowKey}
        columns={columns}
        pagination={
          {
            ...pagination,
            position: ['bottomCenter']
          }
        }
        rowSelection={{
          type: selectionType || 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            typeof onChange === 'function' && onChange(selectedRowKeys, selectedRows);
          }
        }}
        footer={footer}
        {...other}
        {...props}
      >
        {children}
      </AntdTable>
    </div>
  );
};

const Table = forwardRef(TableWarp);
Table.Column = Column;

export default Table;
