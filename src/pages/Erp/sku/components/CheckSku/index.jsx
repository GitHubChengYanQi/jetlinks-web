import React, {useRef, useState} from 'react';
import {Button, Space, Table as AntTable} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {Submit} from '@formily/antd';
import {useSetState} from 'ahooks';
import * as SysField from '@/pages/Erp/sku/skuField';
import {skuList} from '@/pages/Erp/sku/skuUrl';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import SkuEdit from '@/pages/Erp/sku/skuEdit';
import Form from '@/components/Form';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import SkuDetail from '@/pages/Erp/sku/SkuDetail';

const {Column} = AntTable;
const {FormItem} = Form;

const CheckSku = ({onChange=()=>{}}) => {

  const [loading, setLoading] = useState();

  const [skus, setSkus] = useSetState({data: []});

  const ref = useRef(null);

  const detailRef = useRef(null);

  const formRef = useRef(null);

  const tableRef = useRef(null);

  const searchForm = () => {

    return (
      <>
        <FormItem
          label="分类"
          name="spuClass"
          placeholder="搜索分类"
          component={SysField.SelectSpuClass}
        />
        <FormItem
          placeholder="搜索 名称 / 型号 / 编码"
          name="skuName"
          component={SysField.SelectSkuName} />

      </>
    );
  };


  const footer = () => {
    return (
      <>
        <Button onClick={() => {
          onChange(skus.data);
        }}>选择</Button>
      </>
    );
  };


  return (
    <>
      <Table
        title={<h2>添加物料</h2>}
        api={skuList}
        contentHeight
        SearchButton={<Space>
          <Submit><SearchOutlined />查询</Submit>
          <Button onClick={() => {
            ref.current.open(false);
          }}>创建物料</Button>
        </Space>}
        rowKey="skuId"
        pageSize={5}
        noSort
        searchForm={searchForm}
        ref={tableRef}
        footer={footer}
        rowSelection={{
          selectedRowKeys: skus.data.map((item) => {
            return item.skuId;
          }),
          onSelect: (record, selected) => {
            if (selected) {
              const array = skus.data;
              array.push({
                skuId: record.skuId,
                skuResult: <SkuResultSkuJsons skuResult={record} />
              });
              setSkus({data: array});
            } else {
              const array = skus.data.filter((item) => {
                return item.skuId !== record.skuId;
              });
              setSkus({data: array});
            }
          },
          onSelectAll: (selected, selectedRows,changeRows) => {
            if (selected) {
              const ids = skus.data.map((item) => {
                return item.skuId;
              });
              const array = selectedRows.filter((item) => {
                return item && !ids.includes(item.skuId);
              }).map((item) => {
                return {
                  skuId: item.skuId,
                  skuResult: <SkuResultSkuJsons skuResult={item} />
                };
              });
              setSkus({data: skus.data.concat(array)});
            } else {
              const deleteIds = changeRows.map((item) => {
                return item.skuId;
              });
              const array = skus.data.filter((item) => {
                return !deleteIds.includes(item.skuId);
              });
              setSkus({data: array});
            }
          }
        }
        }
      >

        < Column title="物料" key={2} dataIndex="skuId" render={(value, record) => {
          return <SkuResultSkuJsons skuResult={record} />;
        }} />

        <Column title="操作" key={8} dataIndex="skuId" width={100} align="center" render={(value, record) => {
          return <Button type="link" onClick={() => {
            detailRef.current.open(value);
          }}>详情</Button>;
        }} />

      </Table>

      <Modal ref={detailRef} width={1000} component={SkuDetail} />

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
          <Button
            loading={loading}
            type="primary"
            ghost
            onClick={() => {
              formRef.current.nextAdd(true);
            }}
          >完成并添加下一个</Button>
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

export default CheckSku;
