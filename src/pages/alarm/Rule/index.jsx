import React, {useState} from 'react';
import {Space, Input} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {DangerButton, PrimaryButton} from '@/components/Button';
import Save from '@/pages/alarm/Rule/Save';

const Rule = () => {

  const [saveVisible, setSaveVisible] = useState();

  const dataSource = Array(5).fill('').map((item, index) => ({
    key: index,
    '0': '0',
    '1': '2022/08/19 12:00:00',
    '2': `4012M智能箱${index}`,
    '3': '智能箱产品',
    '4': '浑南区、和平区',
    '5': '浑南区、和平区',
    '6': 'OPT IMS-4012M',
    '7': '市电断电',
    '8': 'EC:B9:70:BB:74:34',
    '9': '辽宁奥普泰通信股份有限公司',
    '10': '沈阳市浑南区文溯街',
  }));

  const columns = [
    {title: '规则名称', dataIndex: '1', align: 'center', render: (text) => <Render width={150} text={text} />},
    {title: '设备型号', dataIndex: '3', align: 'center', render: (text) => <Render text={text} />},
  ];

  const searchForm = () => {
    return <>
      <FormItem label="规则名称" name="1" component={Input} />
      <FormItem label="设备型号" name="2" component={Input} />
    </>;
  };

  return <>
    <Table
      tableKey="rule"
      searchButtons={[
        <PrimaryButton key="1" onClick={() => {
          setSaveVisible({});
        }}>新增规则</PrimaryButton>
      ]}
      searchForm={searchForm}
      dataSource={dataSource}
      columns={columns}
      rowKey="key"
      actionRender={() => (
        <Space>
          <PrimaryButton onClick={() => {

          }}>
            编辑
          </PrimaryButton>
          <Warning>
            <DangerButton>删除</DangerButton>
          </Warning>
        </Space>
      )}
    />

    <Save
      visible={saveVisible}
      close={() => setSaveVisible()}
      success={() => {
        setSaveVisible();
      }}
    />
  </>;
};
export default Rule;
