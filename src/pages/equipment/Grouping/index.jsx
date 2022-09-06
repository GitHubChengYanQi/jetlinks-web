import React, {useState} from 'react';
import { Row, Col, Button, Space, Dropdown, Menu, Select, Input} from 'antd';
import LeftTree from '@/pages/monitor/LeftTree';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from './Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import styles from '@/pages/monitor/index.module.less';

const Grouping = props => {

  const [saveVisible, setSaveVisible] = useState();
  const dataSource = Array(5).fill('').map((item, index) => ({
    key: index,
    '0': '0',
    '1': '辽宁奥普泰通信股份有限公司',
    '2': `浑南区${index}`,
    '3': 100,
    '4': '启用',
    '5': '2022/08/21 12:00:00',
  }));

  const columns = [
    {
      title: '序号',
      dataIndex: '0',
      align: 'center',
      render: (value, record, index) => <Render text={index + 1} width={50}/>
    },
    {title: '所属客户', dataIndex: '1', align: 'center', render: (text) => <Render text={text}/>},
    {title: '分组名称', dataIndex: '2', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备数量', dataIndex: '3', align: 'center', render: (text) => <Render text={text}/>},
    {title: '分组状态', dataIndex: '4', align: 'center', render: (text) => <Render text={text}/>},
    {title: '创建时间', dataIndex: '5', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      dataIndex: '2',
      render: (text, record) => (
        <Space>
          <Button onClick={() => setSaveVisible({id: '1', name: text})}>编辑</Button>
          <Warning>
            <Button danger>删除</Button>
          </Warning>
        </Space>
      ),
    },
  ];


  const menu = <Menu
    items={[
      {
        key: '1',
        label: '单独新建',
        onClick: () => {
          setSaveVisible({});
        }
      },
      {
        key: '2',
        label: '批量导入',
        onClick: () => {

        }
      },
    ]}
  />;

  const [close, setClose] = useState(false);

  const searchForm = () => {
    return <>
      <FormItem label="所属客户" name="customer" component={Select} select/>
      <FormItem label="分组名称" name="1" component={Input}/>
      <FormItem label="设备状态" name="2" component={Select} select/>
    </>;
  };

  return <>
    <Row gutter={24}>
      <Col span={close ? 0 : 4}>
        <div className={styles.leftTree}>
          <LeftTree
            close={() => setClose(true)}
            noAction
            showModules={['group']}
            onChange={(key) => {

            }}/>
        </div>
      </Col>
      <Col span={close ? 24 : 20}>
        <Table
          searchForm={searchForm}
          searchButtons={[
            <Dropdown key={1} overlay={menu} placement="bottom">
              <Button>新建分组</Button>
            </Dropdown>,
            <Button key={2}>导出</Button>
          ]}
          dataSource={dataSource}
          columns={columns}
          rowKey="key"
        />
      </Col>
    </Row>

    <Save
      success={() => {
      }}
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
    />
  </>;
};

export default Grouping;
