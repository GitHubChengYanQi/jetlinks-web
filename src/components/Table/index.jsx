import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Row, Col, Card, Layout, Table as AntdTable, Space} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {useFormTableQuery, createFormActions, Form, Submit, Reset, FormButtonGroup} from '@formily/antd';
import useUrlState from '@ahooksjs/use-url-state';
import Service from '@/util/Service';
import style from './index.module.less';
import useTableSet from '@/hook/useTableSet';
import TableSort from '@/components/Table/components/TableSort';


const {Column} = AntdTable;
const {Sider, Content} = Layout;

const formActionsPublic = createFormActions();

const TableWarp = ({
  children,
  columns,
  actions,
  NoChildren,
  title,
  NoSortAction,
  maxHeight,
  loading: getLoading,
  showCard,
  selectedRowKeys,
  api,
  tableData,
  actionButton,
  pageSize,
  noPagination,
  isChildren,
  contentHeight,
  searchForm,
  cardTitle,
  rowKey,
  headStyle,
  tab,
  dataSource: dataSources,
  noSort,
  configPagination,
  tableKey,
  branch,
  noRowSelection,
  bodyStyle,
  bordered,
  defaultSelectedRowKeys,
  SearchButton,
  selectionType,
  onChange,
  getCheckboxProps,
  layout,
  expandable,
  listHeader = true,
  labelAlign,
  sortList,
  footer: parentFooter,
  isModal = true,
  formActions = null,
  left,
  ...props
}, ref) => {

  if (!rowKey) {
    rowKey = api.rowKey;
  }
  if (!rowKey) {
    console.warn('Table component: rowKey cannot be empty,But now it doesn\'t exist!');
  }

  // 排序
  const [sorts, setSorts] = useState([]);

  const {ajaxService} = Service();

  const [state, setState] = useUrlState(
    {
      navigateMode: 'push',
    },
  );

  if (!formActions) {
    formActions = formActionsPublic;
  }
  // const [formActions,setFormActions] = useState(formActionsPublic);

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
    if (!isModal) {
      setState({
        params: JSON.stringify({
          ...page, ...values
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
          ...api,
          data: {
            ...values,
          },
          ...other,
          params: page
        });
      }

      if (typeof branch === 'function') {
        response.data = branch(response.data);
      }
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
      return new Promise((resolve, reject) => {
        reject(e.message);
      });
    }
  };

  const {form, table: tableProps} = useFormTableQuery(requestMethod, null, {
    pagination: {
      pageSize,
      pageSizeOptions: [5, 10, 20, 50, 100]
    }
  });

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
        {pagination && <div className={style.right}>共{pagination.total || dataSource.length}条</div>}
        <br style={{clear: 'both'}} />
      </div>
    );
  };

  const {tableColumn, setButton} = useTableSet(children, tableKey);

  return (
    <div className={style.tableWarp} id="listLayout" style={{height: '100%', overflowY: 'auto', overflowX: 'hidden'}}>
      <div style={headStyle}>
        {listHeader ? <div className={style.listHeader}>
          {title && <div className="title">{title}</div>}
          <div className="actions" />
        </div> : null}
      </div>
      <Layout>
        {left && <Sider className={style.sider} width={180}>
          {left}
        </Sider>}
        <Content
          style={{height: contentHeight || 'calc(100vh - 128px)', overflow: 'auto'}}
          id="tableContent"
        >
          {searchForm ? <div className="search" style={headStyle}>
            <Row justify="space-between">
              <Col>
                <Form
                  layout={layout || 'inline'}
                  {...form}
                  actions={formActions}
                >
                  {typeof searchForm === 'function' && searchForm()}
                  {SearchButton ||
                  <FormButtonGroup><Submit><SearchOutlined />查询</Submit><Reset>重置</Reset> </FormButtonGroup>}
                </Form>
              </Col>
              <Col className={style.setTing}>
                {!listHeader && actions}
              </Col>
            </Row>

          </div> : <Form
            layout="inline"
            {...form}
            actions={formActions}
          />}
          {showCard}
          <Card
            bordered={bordered || false}
            title={listHeader ? actions : null}
            headStyle={headStyle}
            bodyStyle={bodyStyle}
            extra={<Space>
              {actionButton}
              {!headStyle && setButton}
            </Space>}
          >
            <AntdTable
              showTotal
              expandable={expandable}
              loading={getLoading || loading}
              dataSource={dataSource || []}
              rowKey={rowKey}
              columns={columns}
              pagination={
                noPagination || {
                  ...pagination,
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
                getCheckboxProps,
              }}
              footer={footer}
              layout
              scroll={{x: 'max-content', y: maxHeight}}
              sticky={{
                getContainer: () => {
                  return document.getElementById('tableContent');
                }
              }}
              {...other}
              {...props}
            >
              {noSort || <Column
                fixed="left"
                title="序号"
                dataIndex="sort"
                width={80}
                align="center"
                render={(text, item, index) => {
                  if (!NoSortAction && (text || text === 0)) {
                    return <TableSort
                      rowKey={item[rowKey]}
                      sorts={sorts}
                      value={text}
                      onChange={(value) => {
                        if (typeof sortList === 'function') {
                          sortList(value);
                        }
                        setSorts(value);
                      }} />;
                  } else {
                    return <>{index + 1}</>;
                  }

                }} />}
              {tableColumn.filter((items) => {
                if (items && items.props && items.props.visible === false) {
                  return false;
                }
                return !(items && (items.checked === false));
              })}
            </AntdTable>
          </Card>
        </Content>
      </Layout>

    </div>
  );
};

const Table = forwardRef(TableWarp);
Table.Column = Column;

export default Table;
