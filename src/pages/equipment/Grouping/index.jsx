import React, {useRef, useState} from 'react';
import {Row, Col, Button, Space, Dropdown, Menu, Select, Input, Select as AntSelect} from 'antd';
import LeftTree from '@/pages/monitor/LeftTree';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from './Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import styles from '@/pages/monitor/index.module.less';
import {deviceClassifyList} from '@/pages/equipment/Grouping/url';
import BatchImport from '@/components/BatchImport';
import {DangerButton, PrimaryButton} from '@/components/Button';

const Grouping = () => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();
  const [batchImport, setBatchImport] = useState(false);

  const columns = [
    {title: '所属客户', dataIndex: '1', align: 'center', render: (text) => <Render text={text} />},
    {title: '分组名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text} />},
    {title: '创建时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text} />},
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
          setBatchImport(true);
        }
      },
    ]}
  />;

  const [close, setClose] = useState(false);

  const searchForm = () => {
    return <>
      <FormItem label="所属客户" name="customer" component={Select} select />
      <FormItem label="分组名称" name="name" component={Input} />
      <FormItem
        initialValue={0}
        label="分组状态"
        name="status"
        component={({value, onChange}) => {
          return <Select
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '启用', value: '1'}, {label: '禁用', value: '0'},]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
        select
      />
    </>;
  };

  return <>
    <Row gutter={24}>
      <Col span={close ? 1 : 4}>
        <div className={styles.leftTree}>
          <LeftTree
            open={close}
            close={() => setClose(!close)}
            noAction
            showModules={['group']}
            onChange={() => {

            }}
          />
        </div>
      </Col>
      <Col span={close ? 23 : 20}>
        <Table
          ref={ref}
          searchButtons={[
            <Dropdown key={1} overlay={menu} placement="bottom">
              <Button type="primary">新建分组</Button>
            </Dropdown>,
            <Button key={2} type="primary">导出</Button>
          ]}
          api={deviceClassifyList}
          columns={columns}
          rowKey="classifyId"
          actionRender={(text) => (
            <Space>
              <PrimaryButton onClick={() => setSaveVisible({id: '1', name: text})}>编辑</PrimaryButton>
              <Warning>
                <DangerButton>删除</DangerButton>
              </Warning>
            </Space>
          )}
        />
      </Col>
    </Row>

    <Save
      success={() => {
        setSaveVisible(null);
        ref.current.submit();
      }}
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
    />

    <BatchImport
      title="分组"
      success={() => {
        setBatchImport(false);
        ref.current.submit();
      }}
      visible={batchImport}
      close={() => setBatchImport(false)}
    />
  </>;
};

export default Grouping;
