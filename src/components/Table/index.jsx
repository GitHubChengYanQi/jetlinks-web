import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Row, Col, Card, Layout, Table as AntdTable, Button} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import Service from '@/util/Service';
import {useFormTableQuery, createFormActions, Form, Submit, FormButtonGroup} from '@formily/antd';
import useUrlState from '@ahooksjs/use-url-state';
import Icon from '@/components/Icon';
import style from './index.module.less';
import useTableSet from '@/hook/useTableSet';


const {Column} = AntdTable;
const {Sider, Content} = Layout;

const formActionsPublic = createFormActions();

const TableWarp = ({
  children,
  columns,
  actions,
  title,
  api,
  contentHeight,
  searchForm,
  cardTitle,
  data,
  rowKey,
  headStyle,
  tab,
  noSort,
  tableKey,
  rowSelection,
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
  footer: parentFooter,
  isModal = true,
  formActions = null,
  left,
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

  const [state, setState] = useUrlState(
    {
      navigateMode: 'push',
    },
  );

  if (!formActions) {
    formActions = formActionsPublic;
  }
  // const [formActions,setFormActions] = useState(formActionsPublic);

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
      response = await ajaxService({
        ...api,
        data: {
          ...values,
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

  typeof data === 'function' && data(dataSource);

  const footer = () => {
    return (
      <div className={style.footer}>
        {parentFooter && <div className={style.left}>{parentFooter()}</div>}
        {pagination && <div className={style.right}>共{pagination.total}条</div>}
        {/* {pagination && <Pagination style={{float: 'right'}} {...pagination} size="small" />} */}
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
          <div className="actions">
            {/* <div className="search" style={{ textAlign: title ? 'right' : 'left' }}/> */}
            <div className="button">{actions}</div>
          </div>
        </div> : null}

      </div>
      <Layout>
        {left && <Sider className={style.sider} width={180}>
          {left}
        </Sider>}
        <Content
          // style={{marginLeft: 260}}
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
                  {SearchButton || <FormButtonGroup><Submit><SearchOutlined />查询</Submit> </FormButtonGroup>}
                </Form>
              </Col>
              <Col className={style.setTing}>
                {setButton}
              </Col>
            </Row>

          </div> : <Form
            layout="inline"
            {...form}
            actions={formActions}
          />}
          <Card bordered={bordered} title={cardTitle} bodyStyle={bodyStyle}>
            <AntdTable
              showTotal
              expandable={expandable}
              loading={loading}
              dataSource={dataSource || []}
              rowKey={rowKey}
              columns={columns}
              pagination={
                {
                  ...pagination,
                  showQuickJumper: true,
                  position: ['bottomRight']
                }
              }
              rowSelection={!rowSelection && {
                type: selectionType || 'checkbox',
                defaultSelectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                  typeof onChange === 'function' && onChange(selectedRowKeys, selectedRows);
                },
                getCheckboxProps
              }}
              footer={footer}
              layout
              scroll={{x: 'max-content'}}
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
                  return index + 1;
                }} />}
              {tableColumn}
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
