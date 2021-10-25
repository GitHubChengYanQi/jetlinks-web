/**
 * 产品属性数据表列表页
 *
 * @author song
 * @Date 2021-10-18 11:30:54
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {attributeValuesDelete, attributeValuesList} from '../attributeValuesUrl';
import AttributeValuesEdit from '../attributeValuesEdit';
import * as SysField from '../attributeValuesField';
import Breadcrumb from '@/components/Breadcrumb';
import {Number} from '../attributeValuesField';
import {createFormActions} from '@formily/antd';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const AttributeValuesList = (props) => {

  const {value} = props;

  const ref = useRef(null);
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
        <FormItem hidden name="attributeId" value={value} component={SysField.Difference} />
        <FormItem label="值" name="attributeValues" component={SysField.Number} />
      </>
    );
  };

  return (
    <>
      <Table
        contentHeight
        title={<Breadcrumb title='属性值管理' />}
        api={attributeValuesList}
        formActions={formActionsPublic}
        rowKey="attributeValuesId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="值" dataIndex="attributeValues" />

        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.attributeValuesId);
              }} />
              <DelButton api={attributeValuesDelete} value={record.attributeValuesId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="值" component={AttributeValuesEdit} attributeId={value} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default AttributeValuesList;
