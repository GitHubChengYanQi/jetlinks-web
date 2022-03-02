/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useEffect, useRef, useState} from 'react';
import {Badge, Button, Descriptions, Dropdown, Menu, Radio, Space} from 'antd';
import ProCard from '@ant-design/pro-card';
import {DownOutlined} from '@ant-design/icons';
import {createFormActions} from '@formily/antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import {partsList, partsRelease} from '../PartsUrl';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import EditButton from '@/components/EditButton';
import AddButton from '@/components/AddButton';
import PartsEdit from '@/pages/Erp/parts/PartsEdit';
import Table from '@/components/Table';
import * as SysField from '../PartsField';
import Form from '@/components/Form';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import {useRequest} from '@/util/Request';
import ShowBOM from '@/pages/Erp/parts/components/ShowBOM';
import Drawer from '@/components/Drawer';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';
import BackSkus from '@/pages/Erp/sku/components/BackSkus';

const {Column} = Table;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const PartsList = ({spuId, value, type = 1}) => {

  const refAdd = useRef();
  const formRef = useRef();
  const tableRef = useRef();
  const showRef = useRef();

  const [radio, setRadio] = useState('1');

  const {loading: skuLoading, data: skuData, run: sku} = useRequest(skuDetail, {manual: true});

  useEffect(() => {
    if (value) {
      sku({
        data: {
          skuId: value
        }
      });
    }
  }, []);

  const [bom, setBom] = useState();

  const {run} = useRequest(partsRelease, {
    manual: true, onSuccess: () => {
      tableRef.current.submit();
    }
  });

  if (skuLoading) {
    return <ProSkeleton type="descriptions" />;
  }

  const action = () => {
    return (
      <AddButton onClick={() => {
        refAdd.current.open(false);
      }} />
    );
  };

  const searchForm = () => {

    return (
      <>
        <FormItem
          label="物料"
          placeholder="请选择物料"
          name="skuId"
          value={value}
          component={SysField.SkuIdInput} />
        <FormItem
          hidden
          placeholder="请选择物料"
          name="spuId"
          value={spuId}
          component={SysField.PartName} />
        <FormItem
          hidden
          placeholder="请选择物料"
          name="type"
          value={type}
          component={SysField.PartName} />
      </>
    );
  };

  const menu = (record) => {

    return <Menu
      onClick={({key}) => {
        switch (key) {
          case '1':
            setBom({copy: false, type: 2});
            break;
          case '2':
            setBom({copy: true, type: 2});
            break;
          default:
            break;
        }
        refAdd.current.open(record.partsId);
      }}>
      <Menu.Item key={1}>
        <Button type="link">
          新建
        </Button>
      </Menu.Item>
      <Menu.Item key={2}>
        <Button type="link">
          拷贝
        </Button>
      </Menu.Item>
    </Menu>;
  };

  const table = () => {
    return <>
      {value && skuData && <>
        <Descriptions style={{margin: 24, marginBottom: 0}} column={2} contentStyle={{fontWeight: 700}}>
          <Descriptions.Item label="编号">{skuData.standard}</Descriptions.Item>
          <Descriptions.Item label="物料"><BackSkus record={skuData} /></Descriptions.Item>
          <Descriptions.Item label="描述">
            {
              skuData.list
              &&
              skuData.list.length > 0
              &&
              skuData.list[0].attributeValues
                ?
                <em>({skuData.list.map((items) => {
                  return `${items.itemAttributeResult.attribute} ： ${items.attributeValues}`;
                }).toString()})</em>
                :
                '无'
            }
          </Descriptions.Item>
          <Descriptions.Item>
            <Radio.Group value={`${radio}`} onChange={(value) => {
              setRadio(value.target.value);
              tableRef.current.formActions.setFieldValue('type', value.target.value);
              tableRef.current.submit();
            }}>
              <Radio value="1">设计BOM</Radio>
              <Radio value="2">生产BOM</Radio>
            </Radio.Group>
          </Descriptions.Item>
        </Descriptions>
      </>}

      <Table
        formActions={formActionsPublic}
        headStyle={{display: (spuId || value) && 'none'}}
        title={<Breadcrumb title="物料清单" />}
        actions={action()}
        contentHeight
        noRowSelection
        api={partsList}
        rowKey="partsId"
        tableKey="parts"
        searchForm={searchForm}
        ref={tableRef}
      >
        {!value && <Column title="物料" key={1} dataIndex="skuId" render={(value, record) => {
          return (<SkuResultSkuJsons skuResult={record.skuResult} />);
        }} />}
        <Column title="类型" key={5} dataIndex="type" render={(value, record) => {
          switch (parseInt(value, 0)) {
            case 1:
              return <Badge color={record.display === 0 ? '#eee' : 'green'} text="设计BOM" />;
            case 2:
              return <Badge color={record.display === 0 ? '#eee' : 'blue'} text="生产BOM" />;
            default:
              break;
          }
        }} />
        <Column title="创建时间" key={6} dataIndex="createTime" render={(value, record) => {
          return !record.partsDetailId && <>{value}</>;
        }} />
        <Column title="创建人" key={7} dataIndex="userResult" render={(value) => {
          return <>{value && value.name}</>;
        }} />

        <Column
          title="操作"
          key={99}
          fixed="right"
          align="center"
          dataIndex="partsId"
          width={300}
          render={(value, record) => {
            return <>
              {
                record.display === 0 ? '历史数据' : <Space>
                  <>
                    {record.status !== 99 ?
                      <Button type="link" onClick={() => {
                        run({
                          data: {
                            partsId: value,
                          }
                        });
                      }}>发布</Button>
                      :
                      parseInt(record.type, 0) === 1 && <Dropdown overlay={menu(record)}>
                        <Button type="link">
                          新建生产BOM<DownOutlined />
                        </Button>
                      </Dropdown>
                    }
                    <EditButton onClick={() => {
                      setBom({type: record.type, copy: true});
                      refAdd.current.open(value);
                    }} />
                  </>
                </Space>
              }
              <Button type="link" onClick={() => {
                showRef.current.open(record.partsId);
              }}>详情</Button>
            </>;
          }} />
      </Table>
    </>;
  };

  return (
    <>
      {spuId ?
        <ProCard className="h2Card" title="清单列表" headerBordered extra={action()}>
          {table()}
        </ProCard>
        :
        table()
      }
      <Modal
        width={900}
        type={type}
        title="清单"
        bom={bom}
        compoentRef={formRef}
        component={PartsEdit}
        onClose={() => {
          setBom(null);
        }}
        onSuccess={() => {
          if (bom && bom.type) {
            setRadio(bom.type);
            tableRef.current.formActions.setFieldValue('type', bom.type);
          }
          setBom(null);
          tableRef.current.submit();
          refAdd.current.close();
        }}
        ref={refAdd}
        spuId={spuId}
        footer={<>
          <Button type="primary" onClick={() => {
            formRef.current.submit();
          }}>保存</Button>
        </>}
      />

      <Drawer
        extra
        height="100%"
        placement="top"
        headTitle="物料清单"
        width={1000}
        component={ShowBOM}
        ref={showRef}
      />

    </>
  );
};

export default PartsList;
