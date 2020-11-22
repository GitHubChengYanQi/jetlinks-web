import React, {forwardRef, useImperativeHandle} from 'react';
import {Table as AntdTable, Button} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import {useTableRequest} from '@/util/Request';
import Service from '@/util/Service';
import {useFormTableQuery, createFormActions, Form} from '@formily/antd';

import style from './index.module.less';

const {Column} = AntdTable;

const formActions = createFormActions();

const TableWarp = ({children, columns, actions, title, api, searchForm, rowKey, ...props}, ref) => {

  if (!api) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }

  if (!rowKey) {
    rowKey = api.rowKey;
  }
  if (!rowKey) {
    console.warn('Table component: rowKey cannot be empty,But now it doesn\'t exist!');
  }

  // const [form] = Form.useForm();
  //
  // const {tableProps, search, refresh} = useTableRequest(api, {
  //   form
  // });
  //
  // const {submit, reset, changeType, type} = search;


  const {ajaxService} = Service();

  const requestMethod = async (params) => {
    const {values, pagination, ...other} = params;
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
        console.log(response);
        resolve({
          dataSource: response.data,
          total: response.count
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

  const {submit} = form;

  useImperativeHandle(ref, () => ({
    refresh: formActions.submit,
    submit: formActions.submit,
    // reset,
    // changeType,
    // type
  }));

  const {loading, dataSource, ...other} = tableProps;

  return (
    <div className={style.tableWarp}>
      <div className={style.listHeader}>
        {title && <div className="title">{title}</div>}
        <div className="actions">
          <div className="search" style={{textAlign: title ? 'right' : 'left'}}>

            <Form
              layout="inline"
              {...form}
              actions={formActions}
              style={{float: title ? 'right' : 'left'}}>
              {searchForm}
            </Form>
            {/* <Form layout="inline" form={form} style={{float: title ? 'right' : 'left'}}> */}
            {/*  {searchForm}* /}
            {/* </Form> */}
          </div>
          <div className="button">
            <>{actions}</>
            <Button className="button-left-margin" onClick={() => {
              // refresh();
              formActions.reset();
            }}><ReloadOutlined/></Button>
          </div>
        </div>
      </div>
      <AntdTable
        loading={loading}
        dataSource={dataSource || []}
        rowKey={rowKey}
        columns={columns}
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
