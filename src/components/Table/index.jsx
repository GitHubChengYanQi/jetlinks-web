import React, {forwardRef, useImperativeHandle} from 'react';
import {Table as AntdTable, Button,Form} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import {useTableRequest} from '@/util/Request';

import style from './index.module.less';

const {Column} = AntdTable;

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

  const [form] = Form.useForm();

  const {tableProps, search, refresh} = useTableRequest(api, {
    form
  });
  const {submit, reset, changeType, type} = search;


  useImperativeHandle(ref, () => ({
    refresh,
    submit,
    reset,
    changeType,
    type
  }));


  return (
    <div className={style.tableWarp}>
      <div className={style.listHeader}>
        {title && <div className="title">{title}</div>}
        <div className="actions">
          <div className="search" style={{textAlign: title ? 'right' : 'left'}}>
            <Form layout="inline" form={form} style={{float: title ? 'right' : 'left'}}>
              {searchForm}
            </Form>
          </div>
          <div className="button">
            <>{actions}</>
            <Button className="button-left-margin" onClick={() => {
              refresh();
            }}><ReloadOutlined/></Button>
          </div>
        </div>
      </div>
      <AntdTable rowKey={rowKey} columns={columns} {...tableProps} {...props}>
        {children}
      </AntdTable>
    </div>
  );
};

const Table = forwardRef(TableWarp);
Table.Column = Column;

export default Table;
