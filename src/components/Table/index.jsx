import React, {forwardRef, useImperativeHandle} from 'react';
import {Button, Card, Col, Row, Space, Table as AntdTable} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {createFormActions, Form, FormButtonGroup, useFormTableQuery} from '@formily/antd';
import useUrlState from '@ahooksjs/use-url-state';
import Service from '@/util/Service';
import style from './index.module.less';
import Render from '@/components/Render';
import useTableSet from '@/hook/useTableSet';


const {Column} = AntdTable;

const formActionsPublic = createFormActions();

const TableWarp = (
  {
    // a
    actions,
    api,
    actionButton,
    actionRender = () => {
      return <></>;
    },
    // b
    bodyStyle,
    bordered,
    // c
    children,
    columns,
    contentHeight,
    cardTitle,
    configPagination,
    cardHeaderStyle,
    columnsResh,
    condition = () => true,
    // d
    dataSource: dataSources,
    defaultSelectedRowKeys,
    // e
    expandable,
    // f
    formSubmit,
    format = (data) => data,
    footer: parentFooter,
    formActions = null,
    // g
    getCheckboxProps,
    // h
    headStyle,
    // i
    isChildren,
    isModal = true,
    // l
    left,
    layout,
    listHeader = true,
    labelAlign,
    loading: getLoading,
    loading: otherLoading,
    // m
    maxHeight,
    // n
    NoChildren,
    noPagination,
    noSort,
    noRowSelection,
    noTableColumn,
    noFooter,
    noAction,
    noForm,
    // o
    onChange,
    onReset = () => {
    },
    onResponse = () => {
    },
    // p
    pageSize,
    // r
    rowSelection,
    rowKey,
    // s
    sortAction,
    showCard,
    selectedRowKeys,
    searchForm,
    SearchButton,
    selectionType,
    sortList,
    submitAction,
    searchButtons = [],
    // t
    title,
    tableData,
    tab,
    tableKey,
    ...props
  }, ref) => {

  if (!rowKey) {
    rowKey = api.rowKey;
  }
  if (!rowKey) {
    console.warn('Table component: rowKey cannot be empty,But now it doesn\'t exist!');
  }

  const {ajaxService} = Service();

  const [state, setState] = useUrlState(
    {
      navigateMode: 'push',
    },
  );

  let defaultTableQuery = {};

  try {
    defaultTableQuery = state.params && JSON.parse(state.params);
  } catch (e) {
    console.log(e);
  }

  if (!defaultTableQuery) {
    defaultTableQuery = {};
  }

  if (!formActions) {
    formActions = formActionsPublic;
  }

  const dataSourcedChildren = (data) => {
    if (NoChildren || !Array.isArray(data.children) || data.children.length === 0) {
      return {...data, children: null};
    }
    return {
      ...data, children: data.children.map((item) => {
        return dataSourcedChildren(item);
      })
    };
  };

  const requestMethod = async (params) => {
    const {values, pagination, sorter, ...other} = params;
    const page = {};
    page.limit = pagination.pageSize;
    page.page = pagination.current;
    page.sorter = sorter && {
      field: sorter.field,
      order: sorter.order
    };
    const newValues = typeof formSubmit === 'function' ? formSubmit(values) : values;
    if (!condition(newValues)) {
      return new Promise((resolve) => {
        onResponse({});
        resolve('');
      });
    }
    setState({
      params: JSON.stringify({
        ...page, values: pagination.current ? newValues : {}
      })
    });
    let response;
    try {
      if (dataSources) {
        response = {
          data: dataSources
        };
      } else {
        response = await ajaxService({
          ...api,
          data: {
            ...newValues,
          },
          ...other,
          params: page
        });
      }
      onResponse(response || {});
      response.data = format(response.data);
      return new Promise((resolve) => {
        resolve({
          dataSource: Array.isArray(response.data) ? response.data.map((items) => {
            return isChildren ? items : dataSourcedChildren(items);
          }) : [],
          total: response.count,
          current: response.current,
          pageSize: response.pageSize,
        });
      });
    } catch (e) {
      console.warn(e.message);
      return new Promise((resolve) => {
        onResponse({});
        resolve(e.message);
      });
    }
  };

  const {setPagination, form, table: tableProps} = useFormTableQuery(requestMethod, null, {
    pagination: {
      pageSize: pageSize || defaultTableQuery.limit,
      current: defaultTableQuery.page,
      pageSizeOptions: [5, 10, 20, 50, 100]
    },
    sorter: defaultTableQuery.sorter || {},
  });

  const submit = () => {
    setPagination({});
    formActions.submit();
  };

  const reset = () => {
    setPagination({});
    formActions.reset();
    onReset();
  };

  const refresh = () => {
    formActions.submit();
  };

  useImperativeHandle(ref, () => ({
    refresh,
    submit,
    reset: formActions.reset,
    formActions,
  }));

  const {loading, dataSource, pagination, ...other} = tableProps;

  const footer = () => {
    return (
      <div className={style.footer}>
        {parentFooter && <div className={style.left}>{parentFooter()}</div>}
        <br style={{clear: 'both'}} />
      </div>
    );
  };

  const {tableColumn, setButton, saveView, selectView} = useTableSet(children || columns.map((item, index) => ({
    ...item,
    key: `${index}`
  })), tableKey, columnsResh && !loading);

  const action = [];
  if (!noAction) {
    action.push({
      title: <>操作{setButton}</>,
      fixed: 'right',
      align: 'center',
      width: '200px',
      render: actionRender,
    },);
  }

  const searchHeight = document.getElementById('search') || {};

  return (
    <Card bordered={false} bodyStyle={bodyStyle}>
      <div className={style.tableWarp} id="listLayout" style={{height: '100%', overflowX: 'hidden'}}>
        {!noForm && <div id="search" className="search" style={headStyle}>
          {searchForm ?
            <Row justify="space-between">
              <Col>
                <Form
                  value={defaultTableQuery.values || {}}
                  layout={layout || 'inline'}
                  {...form}
                  actions={formActions}
                >
                  {typeof searchForm === 'function' && searchForm()}
                  {SearchButton ||
                  <FormButtonGroup>
                    <Button
                      id="submit"
                      loading={otherLoading || loading}
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        submit();
                      }}><SearchOutlined />查询
                    </Button>
                    <Button
                      onClick={() => {
                        reset();
                      }}>
                      重置
                    </Button>
                    {searchButtons}
                    {selectView}
                    {saveView}
                  </FormButtonGroup>}
                </Form>
              </Col>
              <Col className={style.setTing}>
                {!listHeader && actions}
              </Col>
            </Row> : <>
              <Form
                layout="inline"
                {...form}
                actions={formActions}
              />
              <Space>{searchButtons}</Space>
            </>}
        </div>}
        <AntdTable
          showTotal
          bordered
          onHeaderRow={() => {
            return {
              className: style.headerRow
            };
          }}
          expandable={expandable}
          loading={otherLoading || loading}
          dataSource={dataSource || []}
          rowKey={rowKey}
          columns={[
            ...(noSort ? [] : [{
              title: '序号',
              align: 'center',
              fixed: 'left',
              dataIndex: '0',
              width: '70px',
              render: (value, record, index) => <Render
                text={(pagination.current - 1) * pagination.pageSize + (index + 1)} width={70} />
            }]),
            ...tableColumn.filter(item => item.checked),
            ...action,
          ]}
          pagination={
            noPagination ? false : {
              ...pagination,
              showTotal: (total) => {
                return `共${total || dataSource.length}条`;
              },
              showQuickJumper: true,
              position: ['bottomRight']
            }
          }
          rowSelection={!noRowSelection && {
            type: selectionType || 'checkbox',
            defaultSelectedRowKeys,
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              typeof onChange === 'function' && onChange(selectedRowKeys, selectedRows);
            },
            ...rowSelection,
            getCheckboxProps,
          }}
          footer={noFooter ? false : footer}
          layout
          scroll={{x: 'max-content', y: maxHeight || `calc((100vh - ${320 + searchHeight.clientHeight}px))`}}
          {...other}
          {...props}
        >
          {children}
        </AntdTable>
      </div>
    </Card>
  );
};

const Table = forwardRef(TableWarp);
Table.Column = Column;

export default Table;
