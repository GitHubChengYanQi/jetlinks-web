/**
 * 竞争对手报价列表页
 *
 * @author
 * @Date 2021-09-06 16:08:01
 */

import React, {useEffect, useRef, useState} from 'react';
import {Button, Table as AntTable} from 'antd';
import Table from '@/components/Table';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import {competitorQuoteList} from '../competitorQuoteUrl';
import CompetitorQuoteEdit from '../competitorQuoteEdit';
import * as SysField from '../competitorQuoteField';

const {Column} = AntTable;
const {FormItem} = Form;


const CompetitorTable = ({...props}) => {

  const ref = useRef(null);
  const tableRef = useRef(null);
  const {status, value, businessId} = props;
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  useEffect(() => {
    if (status) {
      tableRef.current.formActions.setFieldValue('campType', status ? status[0] : null);
      tableRef.current.submit();
    }
  }, [status]);

  const [search, setSearch] = useState(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          {businessId ? null :
            <FormItem mega-props={{span: 1}} placeholder="请选择关联项目" name="businessId" component={SysField.BusinessId} />}
        </>
      );
    };

    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout
          responsive={{s: 1, m: 2, lg: 2}}
          labelAlign="left"
          layoutProps={{wrapperWidth: 200}}
          grid={search}
          columns={4}
          full
          autoRow>
          {value ? null :
            <FormItem mega-props={{span: 1}} placeholder="请选择报价方名称" name="competitorId" style={{width: 200}}
                      component={SysField.Competitor} />}
          {search ? formItem() : null}
        </MegaLayout>
      </div>
    );
  };


  const Search = () => {
    return (
      <>
        <MegaLayout>
          <FormButtonGroup>
            <Submit><SearchOutlined />查询</Submit>
            <Button type="link" title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              if (search) {
                setSearch(false);
              } else {
                setSearch(true);
              }
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
            <MegaLayout inline>
              <FormItem hidden name="campType" component={SysField.CampType} />
              {value && <FormItem hidden name="competitorId" value={value || null} component={SysField.CompetitorId} />}
              {businessId &&
              <FormItem hidden name="businessId" value={businessId || null} component={SysField.BusinessId} />}
            </MegaLayout>
          </FormButtonGroup>
        </MegaLayout>

      </>
    );
  };

  return (
    <>
      <Table
        noRowSelection
        title={businessId ? false : <Breadcrumb />}
        api={competitorQuoteList}
        rowKey="quoteId"
        tableKey="quote"
        isModal={false}
        headStyle={{display: businessId && 'none'}}
        searchForm={searchForm}
        SearchButton={Search()}
        layout={search}
        actions={actions()}
        ref={tableRef}
        {...props}
      >
        <Column key={1} width={200} title="报价方名称" dataIndex="competitorId" render={(value, record) => {
          return (
            <div>
              {
                record.competitorResult ? record.competitorResult.name : record.campType === 0 && '我方报价'
              }
            </div>
          );
        }} />
        <Column key={2} width={200} title="关联项目" dataIndex="businessId" render={(value, record) => {
          return (
            <div>
              {
                record.crmBusinessResult ? record.crmBusinessResult.businessName : null
              }
            </div>
          );
        }} />
        <Column key={3} width={100} title="报价金额" dataIndex="competitorsQuote" />
        <Column key={4} width={200} title="报价日期" dataIndex="createTime" />

      </Table>
      <Drawer width={600} title="编辑" component={CompetitorQuoteEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} businessId={businessId || null} competitorId={value || null} />
    </>
  );
};

export default CompetitorTable;
