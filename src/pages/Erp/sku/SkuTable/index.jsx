/**
 * sku表列表页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useEffect, useRef, useState} from 'react';
import {Button, Space, Table as AntTable} from 'antd';
import {CopyOutlined} from '@ant-design/icons';
import {config, useHistory} from 'ice';
import Table from '@/components/Table';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {deleteBatch, skuDelete, skuList} from '../skuUrl';
import SkuEdit from '../skuEdit';
import * as SysField from '../skuField';
import Modal from '@/components/Modal';
import Breadcrumb from '@/components/Breadcrumb';
import Code from '@/pages/Erp/spu/components/Code';
import Import from '@/pages/Erp/sku/SkuTable/Import';
import Icon from '@/components/Icon';
import PartsEdit from '@/pages/Erp/parts/PartsEdit';
import PartsList from '@/pages/Erp/parts/PartsList';

const {Column} = AntTable;
const {FormItem} = Form;

const {baseURI} = config;


const SkuTable = (props) => {

  const {spuClass, ...other} = props;

  const [loading, setLoading] = useState();

  const [ids, setIds] = useState([]);

  const [sku, setSku] = useState([]);

  const [edit, setEdit] = useState([]);

  const [skuId, setSkuId] = useState();

  const ref = useRef(null);
  const showParts = useRef(null);
  const formRef = useRef(null);
  const addParts = useRef(null);
  const tableRef = useRef(null);
  const history = useHistory(null);
  const editParts = useRef(null);

  useEffect(() => {
    if (spuClass) {
      tableRef.current.formActions.setFieldValue('spuClass', spuClass[0]);
      tableRef.current.submit();
    }
  }, [spuClass]);


  useEffect(() => {
    if (skuId) {
      editParts.current.open(false);
    }
  }, [skuId]);


  const actions = () => {
    return (
      <Space>
        <AddButton onClick={() => {
          ref.current.open(false);
          setEdit(false);
        }} />
      </Space>
    );
  };

  const searchForm = () => {

    return (
      <>
        <FormItem
          label="编码"
          placeholder="请输入编码"
          name="standard"
          component={SysField.SelectSkuName} />
        <FormItem
          label="名称"
          placeholder="请输入名称"
          name="spuClassName"
          component={SysField.SelectSkuName} />
        <FormItem
          label="型号"
          placeholder="请输入型号"
          name="spuName"
          component={SysField.SelectSkuName} />
        <FormItem
          name="spuClass"
          hidden
          component={SysField.SelectSpuClass} />
        <FormItem
          name="addMethod"
          hidden
          value={1}
          component={SysField.AddMethod} />
      </>
    );
  };


  const footer = () => {
    return (
      <>
        <Button type="link" disabled={sku.length !== 1} icon={<CopyOutlined />} onClick={() => {
          setEdit(false);
          const value = {
            ...sku[0],
            skuId: null,
          };
          ref.current.open(value);
        }}>
          复制添加
        </Button>
        <DelButton
          disabled={ids.length === 0}
          api={{
            ...deleteBatch,
          }}
          onSuccess={() => {
            tableRef.current.refresh();
          }}
          value={ids}>批量删除</DelButton>
      </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={skuList}
        tableKey="sku"
        actionButton={<Space>
          <Button type="link">查看日志</Button>
          <Import
            url={`${baseURI}Excel/importSku`}
            title="导入物料"
            module="sku"
            onOk={() => {
              tableRef.current.submit();
            }}
            templateUrl={`${baseURI}api/SkuExcel`}
          />
          <Button icon={<Icon type="icon-daoru" />} onClick={() => {

          }}>导出物料</Button>
        </Space>}
        rowKey="skuId"
        isModal={false}
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        footer={footer}
        onChange={(value, record) => {
          setIds(value);
          setSku(record);
        }}
        {...other}
      >

        <Column title="物料编码" key={1} dataIndex="standard" render={(value, record) => {
          return (
            <>
              <Code source="sku" id={record.skuId} />
              <Button type="link" onClick={() => {
                history.push(`/SPU/sku/${record.skuId}`);
              }}>
                {value}
              </Button>
            </>
          );
        }} />

        <Column title="名称 / 型号" key={2} dataIndex="spuId" render={(value, record) => {
          if (record.spuResult)
            return (
              <>
                {record.spuResult.name}
                &nbsp;/&nbsp;
                {record.skuName}
              </>
            );
        }} sorter />

        <Column title="名称" key={3} dataIndex="spuId" hidden render={(value, record) => {
          return (
            <>
              {record.spuResult && record.spuResult.spuClassificationResult && record.spuResult.spuClassificationResult.name}
            </>
          );
        }} sorter />

        <Column title="型号" key={4} dataIndex="spuId" hidden render={(value, record) => {
          return (
            <>
              {record.spuResult && record.spuResult.name}
            </>
          );
        }} sorter />

        <Column title="物料描述" key={5} render={(value, record) => {
          return (
            <>
              {
                record.skuJsons
                &&
                record.skuJsons.map((items, index) => {
                  if (items.values && items.values.attributeValues && items.attribute && items.values) {
                    if (index === record.skuJsons.length - 1) {
                      return `${items.attribute.attribute} : ${items.values.attributeValues}`;
                    }
                    return `${items.attribute.attribute} : ${items.values.attributeValues} / `;
                  } else {
                    return null;
                  }
                })
              }
            </>
          );
        }} />

        <Column title="规格" key={6} dataIndex="specifications" />

        <Column
          key={7}
          title="添加人 / 时间"
          sorter
          width={250}
          align="center"
          dataIndex="user"
          render={(value, record) => {
            return <>
              {value && value.name} / {record.createTime}
            </>;
          }} />

        <Column />

        <Column title="操作" key={8} dataIndex="isBan" width={200} align="center" render={(value, record) => {
          return (
            <>
              <Button type="link" style={{color: record.inBom ? 'green' : 'blue'}} onClick={() => {
                if (record.inBom) {
                  showParts.current.open(record.skuId);
                } else {
                  setSkuId(record.skuId);
                }
              }}>{record.inBom ? '有' : '无'}BOM</Button>
              <EditButton onClick={() => {
                ref.current.open(record);
                setEdit(true);
              }} />
              <DelButton api={skuDelete} value={record.skuId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} />

      </Table>

      <Modal
        title="物料"
        compoentRef={formRef}
        loading={(load) => {
          setLoading(load);
        }}
        component={SkuEdit}
        onSuccess={() => {
          tableRef.current.submit();
          ref.current.close();
        }}
        ref={ref}
        footer={<>
          {!edit && <Button
            loading={loading}
            type="primary"
            ghost
            onClick={() => {
              formRef.current.nextAdd(true);
            }}
          >完成并添加下一个</Button>}
          <Button
            loading={loading}
            type="primary"
            onClick={() => {
              formRef.current.nextAdd(false);
            }}
          >完成</Button>
        </>} />


      <Modal
        width={1200}
        type={null}
        title="清单"
        component={PartsList}
        onSuccess={() => {
          tableRef.current.submit();
          showParts.current.close();
        }}
        ref={showParts}
      />

      <Modal
        width={900}
        type={1}
        headTitle="物料清单"
        sku
        defaultValue={{
          item: {skuId}
        }}
        compoentRef={addParts}
        component={PartsEdit}
        onClose={()=>{
          setSkuId(null);
        }}
        onSuccess={() => {
          setSkuId(null);
          tableRef.current.submit();
          editParts.current.close();
        }}
        ref={editParts}
        footer={<>
          <Button type="primary" onClick={() => {
            addParts.current.submit();
          }}>保存</Button>
        </>}
      />


    </>
  );
};

export default SkuTable;
