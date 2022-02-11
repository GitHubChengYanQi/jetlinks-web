/**
 * sku表列表页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useEffect, useRef, useState} from 'react';
import cookie from 'js-cookie';
import {Button, Space, Table as AntTable, Upload, Modal as AntModal, Progress, message} from 'antd';
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
import Icon from '@/components/Icon';
import Code from '@/pages/Erp/spu/components/Code';

const {Column} = AntTable;
const {FormItem} = Form;

const {baseURI} = config;

const SkuTable = (props) => {

  const {spuClass, ...other} = props;

  const [loading, setLoading] = useState();

  const [ids, setIds] = useState([]);

  const [sku, setSku] = useState([]);

  const [edit, setEdit] = useState([]);

  const ref = useRef(null);
  const formRef = useRef(null);
  const tableRef = useRef(null);
  const history = useHistory(null);

  useEffect(() => {
    tableRef.current.formActions.setFieldValue('spuClass', spuClass ? spuClass[0] : null);
    tableRef.current.submit();
  }, [spuClass]);

  const [filelist, setFilelist] = useState([]);

  const importErrData = (errData) => {
    const data = errData && errData.map((item, index) => {
      return {
        key: index,
        line:item.line,
        sku: item.classItem,
        class: item.spuClass,
        unit: item.unit,
        name: item.spuName,
        coding: item.standard,
        batch: item.isNotBatch,
        attributes: item.attributes && item.attributes.map((item) => {
          return item;
        }).toString()
      };
    });
    AntModal.error({
      width: 1200,
      title: `异常数据 / ${data.length}`,
      content: <div style={{padding: 8}}>
        <AntTable rowKey="key" dataSource={data || []} pagination={false} scroll={{y: '50vh' }}>
          <Table.Column title="错误行" dataIndex="line" />
          <Table.Column title="物料分类" dataIndex="class" />
          <Table.Column title="产品" dataIndex="sku" />
          <Table.Column title="型号" dataIndex="name" />
          <Table.Column title="物料编码" dataIndex="coding" />
          <Table.Column title="单位" dataIndex="unit" />
          <Table.Column title="是否批量" dataIndex="batch" />
          <Table.Column title="参数配置" dataIndex="attributes" />
        </AntTable>
      </div>
    });
  };

  const actions = () => {
    return (
      <Space>
        <Upload
          fileList={filelist}
          action={`${baseURI}Excel/importSku`}
          headers={
            {Authorization: cookie.get('tianpeng-token')}
          }
          name="file"
          beforeUpload={() => {
            message.loading({
              content: '导入中，请稍后...',
              key: 1,
              style: {
                marginTop: '20vh',
              },
            });
            return true;
          }}
          onChange={async ({file, fileList}) => {
            setFilelist(fileList);
            if (file.status === 'done') {
              setFilelist([]);
              if (file.response.data && file.response.data.length > 0) {
                importErrData(file.response && file.response.data);
              }
              message.success({
                content: '导入成功！',
                key: 1,
                duration: 2,
                style: {
                  marginTop: '20vh',
                },
              });
            }
          }}
        >
          <Button icon={<Icon type="icon-daoru" />}>导入物料</Button>
        </Upload>
        <AddButton onClick={() => {
          ref.current.open(false);
          setEdit(false);
        }} />
      </Space>
    );
  };

  const searchForm = () => {

    return (
      <div style={{maxWidth: 800}}>
        <FormItem
          placeholder="产品 / 型号/ 编码"
          name="skuName"
          component={SysField.SelectSkuName} />
        <FormItem
          style={{display: 'none'}}
          hidden v
          alue={0}
          component={SysField.Type} />
        <FormItem
          name="spuClass" style={{display: 'none'}}
          hidden
          component={SysField.SelectSpuClass} />
      </div>
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

        <Column title="产品 / 型号" key={1} dataIndex="spuId" render={(value, record) => {
          if (record.spuResult)
            return (
              <>
                <Code source="sku" id={record.skuId} />
                <Button type="link" onClick={() => {
                  history.push(`/SPU/sku/${record.skuId}`);
                }}>
                  {record.spuResult && record.spuResult.spuClassificationResult && record.spuResult.spuClassificationResult.name}
                  &nbsp;/&nbsp;
                  {record.spuResult.name}
                </Button>
              </>
            );
        }} sorter />

        <Column title="参数组合" key={2} render={(value, record) => {
          return (
            <>
              {
                record.skuJsons
                &&
                record.skuJsons.map((items) => {
                  if (items.values && items.values.attributeValues && items.attribute && items.values) {
                    return `${items.attribute.attribute} : ${items.values.attributeValues}`;
                  } else {
                    return null;
                  }
                }).toString()
              }
            </>
          );
        }} />

        <Column title="物料编码" key={3} dataIndex="standard" />

        <Column key={4} title="创建时间" sorter width={159} align="center" dataIndex="createTime" />

        <Column />

        <Column title="操作" key={5} dataIndex="isBan" width={100} render={(value, record) => {
          return (
            <>
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
    </>
  );
};

export default SkuTable;
