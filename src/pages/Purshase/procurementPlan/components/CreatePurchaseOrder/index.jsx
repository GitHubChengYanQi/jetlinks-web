import React, {useState} from 'react';
import {
  Badge,
  Button,
  Card,
  Descriptions, Divider,
  Empty,
  message,
  Modal,
  notification,
  Radio,
  Space,
  Statistic,
  Table
} from 'antd';
import {DollarCircleOutlined, MoneyCollectOutlined} from '@ant-design/icons';
import {useSetState} from 'ahooks';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import {useRequest} from '@/util/Request';
import {purchaseQuotationAllList} from '@/pages/Purshase/purchaseQuotation/purchaseQuotationUrl';
import ProSkeleton from '@ant-design/pro-skeleton';

const CreatePurchaseOrder = ({data, palnId, onChange}) => {


  const {loading: createLoading, run: createOrder} = useRequest({
    url: '/procurementOrder/add',
    method: 'POST',
  }, {
    manual: true,
    onSuccess: () => {
      onChange();
      notification.success({
        message: '创建采购单成功！',
      });
    }
  });

  const {loading: quotationsLoading, data: quotations} = useRequest(purchaseQuotationAllList);

  const [skus, setSkus] = useSetState({data: []});

  let allMoney = 0;
  skus.data.map((item) => {
    if (item.money) {
      allMoney += item.money;
    }
    return null;
  });

  const [visible, setVisible] = useState();

  if (quotationsLoading) {
    return <ProSkeleton type="descriptions" />;
  }

  if (!data && !quotations) {
    return <Empty />;
  }

  return <div style={{padding: 16}}>
    <Table
      footer={() => <Button disabled={skus.data.length === 0} onClick={() => {
        setVisible(true);
      }}>创建采购单</Button>}
      pagination={false}
      rowKey="detailId"
      dataSource={data}
      rowSelection={{
        type: 'checkbox',
        onChange: (selectedRowKeys, selectedRows) => {
          setSkus({data: selectedRows});
        },
        getCheckboxProps: (record) => ({
          disabled: record.status === 97 || record.status === 99,
        })
      }}
    >
      <Table.Column title="物料" dataIndex="skuResult" render={(value) => {
        return <SkuResultSkuJsons skuResult={value} />;
      }} />
      <Table.Column title="数量" dataIndex="total" />
      <Table.Column title="状态" dataIndex="status" width={100} align="center" render={(value) => {
        return value !== 0 ? <Badge text="已完成" color="green" /> : <Badge text="未完成" color="red" />;
      }} />
      <Table.Column />
    </Table>

    <Modal
      width={800}
      visible={visible}
      destroyOnClose
      onCancel={() => {
        setVisible(false);
      }}
      footer={[<Button loading={createLoading} key="create" type="primary" onClick={() => {
        if (skus.data.filter((item) => {
          return !item.money;
        }).length > 0) {
          return message.warn('请选择物料的供应商和报价信息！');
        }
        createOrder(
          {
            data: {
              money: allMoney,
              detailParams: skus.data.map((item) => {
                return {
                  ...item,
                  number: item.total,
                  status: 99,
                };
              }),
              procurementPlanId: palnId,
            }
          }
        );
      }}>创建</Button>]}
      maskClosable={false}>
      <Card title="创建采购单" bordered={false} extra={<>总金额:{allMoney}</>}>
        <Descriptions column={1} bordered layout="vertical">
          {skus.data.map((item, index) => {
            const skuQuotation = quotations.filter((value) => {
              return value.skuId === item.skuId;
            });
            return <Descriptions.Item
              contentStyle={{width: '100%', display: 'block',maxHeight:200,overflowY:'auto'}}
              label={<>
                <SkuResultSkuJsons skuResult={item.skuResult} />
                <div style={{float: 'right'}}>数量:{item.total} 总价格:{item.money || 0}</div>
              </>}
              key={index}
            >
              {skuQuotation.length > 0
                ?
                <Radio.Group
                  key={index}
                  style={{width: '100%'}}
                  value={skus.data[index].quotations}
                  onChange={({target: {value}}) => {
                    const array = skus.data;
                    const money = (value.afterTax || value.price) * item.total;
                    array[index] = {
                      ...array[index],
                      customerId: value.customerId,
                      money,
                      quotations: value
                    };
                    setSkus({data: array});
                  }}>
                  <Space direction="vertical" style={{width: '100%'}}>
                    {skuQuotation.map((item, index) => {
                      return <>
                        <Radio value={item} key={index} style={{width: '100%'}}>
                          <div style={{width: '100%'}}>
                            <Statistic
                              title={item.customerResult && item.customerResult.customerName}
                              value={item.afterTax || item.price}
                              prefix={<DollarCircleOutlined />}
                              suffix={<em
                                style={{fontSize: 14, color: '#b2b0b0'}}>{item.afterTax > 0 ? '有税' : '无税'}</em>}
                            />
                          </div>
                        </Radio>
                        <Divider style={{margin:8}} />
                      </>;
                    })}
                  </Space>
                </Radio.Group>
                :
                <Empty key={index} description="暂无报价" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              }
            </Descriptions.Item>;
          })}
        </Descriptions>
      </Card>
    </Modal>
  </div>;
};

export default CreatePurchaseOrder;