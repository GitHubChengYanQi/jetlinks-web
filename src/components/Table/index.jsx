import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, Card, Col, Row, Space, Table as AntdTable} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {createFormActions, Form, FormButtonGroup, useFormTableQuery} from '@formily/antd';
import useUrlState from '@ahooksjs/use-url-state';
import Service from '@/util/Service';
import style from './index.module.less';
import Render from '@/components/Render';
import useTableSet from '@/hook/useTableSet';
import axios from 'axios';


const {Column} = AntdTable;

const formActionsPublic = createFormActions();

const CancelToken = axios.CancelToken;
let cancel;

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
    bordered = true,
    // c
    checkedRows = [],
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
    interval,
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
    onChange = () => {
    },
    onChangeRows = () => {
    },
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
    selectedRowKeys = [],
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

  const [timed, setTimed] = useState(false);

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
    if (!isModal) {
      setState({
        params: JSON.stringify({
          ...page, values: newValues
        })
      });
    }
    let response;
    try {
      if (dataSources) {
        response = {
          data: dataSources
        };
      } else {
        response = await ajaxService({
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
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
      pageSize: pageSize || defaultTableQuery.limit || 10,
      current: defaultTableQuery.page || 1,
    },
    sorter: defaultTableQuery.sorter || {},
  });

  const {loading, dataSource, pagination, ...other} = tableProps;

  const submit = () => {
    if (interval && loading && typeof cancel === 'function') {
      cancel();
      setTimeout(() => {
        setTimed(false);
        setPagination({});
        formActions.submit();
      }, 0);
    } else {
      setTimed(false);
      setPagination({});
      formActions.submit();
    }
  };

  const reset = () => {
    setTimed(false);
    setPagination({});
    formActions.reset();
    onReset();
  };

  const refresh = () => {
    if (interval && loading && typeof cancel === 'function') {
      cancel();
      setTimeout(() => {
        setTimed(false);
        formActions.submit();
      }, 0);
    } else {
      setTimed(false);
      formActions.submit();
    }
  };

  const timedRefresh = () => {
    setTimed(true);
    formActions.submit();
  };

  useImperativeHandle(ref, () => ({
    refresh,
    submit,
    timedRefresh,
    reset: formActions.reset,
    formActions,
  }));

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
                      loading={otherLoading || (timed ? false : loading)}
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
          bordered={bordered}
          onHeaderRow={() => {
            return {
              className: style.headerRow
            };
          }}
          expandable={expandable}
          loading={otherLoading || (timed ? false : loading)}
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
                return <>
                  <span hidden={selectedRowKeys.length <= 0}>已选 {selectedRowKeys.length} 条</span>
                  <span className={style.total}>{`共${total || dataSource.length}条`}</span>
                </>;
              },
              showQuickJumper: true,
              position: ['bottomRight'],
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20', '50', '100']
            }
          }
          rowSelection={!noRowSelection && {
            type: selectionType || 'checkbox',
            defaultSelectedRowKeys,
            selectedRowKeys,
            onSelect: (record, selected) => {
              if (selected) {
                onChange([...selectedRowKeys, record[rowKey]]);
                onChangeRows([...checkedRows, record]);
              } else {
                onChange(selectedRowKeys.filter(key => key !== record[rowKey]));
                onChangeRows(checkedRows.filter(item => item[rowKey] !== record[rowKey]));
              }
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
              if (selected) {
                const selectIds = changeRows.map(item => item[rowKey]);
                onChange([...selectedRowKeys, ...selectIds]);
                onChangeRows([...checkedRows, ...changeRows]);
              } else {
                const deleteIds = changeRows.map((item) => {
                  return item[rowKey];
                });
                onChange(selectedRowKeys.filter(key => !deleteIds.some(deleKey => key === deleKey)));
                onChangeRows(checkedRows.filter(item => !deleteIds.some(deleKey => item[rowKey] === deleKey)));
              }
            },
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
