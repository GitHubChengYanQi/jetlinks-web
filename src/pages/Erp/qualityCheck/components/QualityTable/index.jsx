/**
 * 质检表列表页
 *
 * @author song
 * @Date 2021-10-27 13:08:57
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {qualityCheckDelete, qualityCheckList} from '../../qualityCheckUrl';
import QualityCheckEdit from '../../qualityCheckEdit';
import * as SysField from '../../qualityCheckField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;

const QualityTable = (props) => {
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
        <FormItem label="名称" name="name" component={SysField.Name} />
        <FormItem label="简称" name="simpleName" component={SysField.SimpleName} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={qualityCheckList}
        rowKey="qualityCheckId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        {...props}
      >
        <Column title="名称" dataIndex="name" />
        <Column title="简称" dataIndex="simpleName" />
        <Column title="质检分类" dataIndex="qualityCheckClassificationId" render={(value, record) => {
          return (
            <>
              {record.qualityCheckClassificationResult && record.qualityCheckClassificationResult.name}
            </>
          );
        }} />
        <Column title="工具" dataIndex="tool" render={(value, record) => {
          return (
            <>
              {
                record.tools && record.tools.map((items, index) => {
                  if (index === record.tools.length - 1) {
                    return <span key={index}>{items.name}</span>;
                  } else {
                    return <span key={index}>{items.name}&nbsp;，&nbsp;</span>;
                  }
                })
              }
            </>
          );
        }} />
        <Column title="质检格式" dataIndex="type" render={(value)=>{
          switch (value){
            case 1:
              return <>数值</>;
            case 2:
              return <>文本</>;
            case 3:
              return <>是否</>;
            case 4:
              return <>图片</>;
            case 5:
              return <>百分比</>;
            case 6:
              return <>视频</>;
            case 7:
              return <>附件</>;
            default:
              return <></>;
          }
        }} />
        <Column title="备注" dataIndex="note" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.qualityCheckId);
              }} />
              <DelButton api={qualityCheckDelete} value={record.qualityCheckId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal width={850} title="质检项" component={QualityCheckEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default QualityTable;
