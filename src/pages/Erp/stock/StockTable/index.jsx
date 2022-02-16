/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useEffect, useState,} from 'react';
import {
  Button,
  Card,
  Layout,
  message,
  Modal as AntModal,
  Space,
  Table as AntTable,
  Tabs,
  Upload
} from 'antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import Breadcrumb from '@/components/Breadcrumb';
import Table from '@/components/Table';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import DataList from '@/pages/Erp/stock/StockTable/components/DataList';

const {baseURI} = config;
const StockTable = (props) => {

  const {state, left} = props;

  const [key, setKey] = useState('className');

  const [filelist, setFilelist] = useState([]);

  const importErrData = (errData) => {
    const data = errData && errData.map((item, index) => {
      return {
        key: index,
        line: item.line,
        spuClass: item.spuClass,
        strand: item.strand,
        Item: item.Item,
        SpuName: item.SpuName,
        specifications: item.specifications,
        stockNumber: item.stockNumber,
        supperPosition: item.supperPosition,
        position:item.position,
        brand:item.brand,
        error:item.error,
      };
    });
    AntModal.error({
      width: 1200,
      title: `异常数据 / ${data.length}`,
      content: <div style={{padding: 8}}>
        <AntTable rowKey="key" dataSource={data || []} pagination={false} scroll={{y: '50vh'}}>
          <Table.Column title="错误行" dataIndex="line" />
          <Table.Column title="分类" dataIndex="spuClass" />
          <Table.Column title="编码" dataIndex="strand" />
          <Table.Column title="产品" dataIndex="Item" />
          <Table.Column title="型号" dataIndex="SpuName" />
          <Table.Column title="库存数量" dataIndex="stockNumber" />
          <Table.Column title="上级库位" dataIndex="supperPosition" />
          <Table.Column title="库位" dataIndex="position" />
          <Table.Column title="品牌" dataIndex="brand" />
          <Table.Column title="问题原因" dataIndex="error" />
        </AntTable>
      </div>
    });
  };

  const actions = () => {
    return (
      <Space>
        <Upload
          fileList={filelist}
          action={`${baseURI}Excel/importPositionBind`}
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
          <Button icon={<Icon type="icon-daoru" />}>导入库存</Button>
        </Upload>
      </Space>
    );
  };


  const {loading, data, run} = useRequest({
    url: '/viewStockDetails/list',
    method: 'POST',
  }, {
    manual: true
  });

  useEffect(() => {
    run({
      data: {
        type: key,
        storehouseId: state,
      }
    });
  }, [state]);

  return (
    <Card title={<Breadcrumb />}>
      <Layout>
        <Layout.Sider style={{
          left: 0,
          height: '100vh',
          overflow: 'auto',
          backgroundColor: '#fff',
          borderRight: '1px solid #f0f0f0',
        }} width={180}>
          {left}
        </Layout.Sider>
        <Layout>
          <Layout.Content style={{paddingLeft: 16}}>
            <Tabs
              tabBarExtraContent={actions()}
              onChange={(value) => {
                setKey(value);
                run({
                  data: {
                    type: value,
                    storehouseId: state,
                  }
                });
              }}
            >
              <Tabs.TabPane tab="产品" key="className">
                <DataList loading={loading} data={data} type="className" />
              </Tabs.TabPane>
              <Tabs.TabPane tab="型号" key="spu">
                <DataList loading={loading} data={data} type="spu" />
              </Tabs.TabPane>
              <Tabs.TabPane tab="物料" key="sku">
                <DataList loading={loading} data={data} type="sku" />
              </Tabs.TabPane>
            </Tabs>
          </Layout.Content>
        </Layout>
      </Layout>
    </Card>
  );
};

export default StockTable;
