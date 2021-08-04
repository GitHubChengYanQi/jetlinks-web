import React, { forwardRef, useImperativeHandle } from 'react';
import { Table as AntdTable } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Service from '@/util/Service';
import { useFormTableQuery, createFormActions, Form, Submit, FormButtonGroup } from '@formily/antd';
import style from './index.module.less';


const { Column } = AntdTable;

const formActions = createFormActions();

const TableWarp = ({ children, columns, actions, title, api, searchForm, rowKey, ...props }, ref) => {

  if (!api) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }



  if (!rowKey) {
    rowKey = api.rowKey;
  }
  if (!rowKey) {
    console.warn('Table component: rowKey cannot be empty,But now it doesn\'t exist!');
  }

  const { ajaxService } = Service();

  const requestMethod = async (params) => {
    const { values, pagination, ...other } = params;
    const page = {};
    page.limit = pagination.pageSize;
    page.page = pagination.current;
    let response;
    try {
      response = await ajaxService({
        ...api,
        data: values,
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

  const { form, table: tableProps } = useFormTableQuery(requestMethod);

  useImperativeHandle(ref, () => ({
    refresh: formActions.submit,
    submit: formActions.submit,
    reset: formActions.reset,
    formActions,
  }));

  const { loading, dataSource,pagination, ...other } = tableProps;
  // pagination
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
            <Submit><SearchOutlined/>查询</Submit>
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
            showTotal: (total, range) => `当前${range[0]}-${range[1]}/共${total}条`
          }
        }
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
