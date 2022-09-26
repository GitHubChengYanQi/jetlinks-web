import React, {useState} from 'react';
import {Drawer, Table} from 'antd';
import Render from '@/components/Render';
import Contacts from '@/pages/alarm/Contacts';
import {PrimaryButton} from '@/components/Button';
import styles from '@/pages/monitor/index.module.less';
import style from '@/components/Table/index.module.less';

const AddContacts = (
  {
    show,
    value = [],
    onChange = () => {
    }
  }
) => {

  const [open, setOpen] = useState(false);

  return <>
    <Table
      pagination={false}
      onHeaderRow={() => {
        return {
          className: style.headerRow
        };
      }}
      columns={[
        {title: '姓名', dataIndex: 'name', align: 'center', render: (text) => <Render width={150} text={text}/>},
        {title: '职务', dataIndex: 'job', align: 'center', render: (text) => <Render text={text}/>},
        {title: '手机号码', dataIndex: 'phone', align: 'center', render: (text) => <Render width={150} text={text}/>},
        {title: '负责区域', dataIndex: 'region', align: 'center', render: (text) => <Render text={text}/>},
      ]}
      dataSource={value}
      rowKey="contactId"
      footer={() => {
        return !show && <PrimaryButton ghost onClick={() => {
          setOpen(true);
        }}>增加报警联系人</PrimaryButton>;
      }}
    />

    <Drawer
      zIndex={1002}
      title="选择报警联系人"
      destroyOnClose
      className={styles.drawer}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Contacts
        ids={value.map(item => item.contactId)}
        noAction
        onSuccess={() => setOpen(false)}
        onChange={(value, records) => {
          onChange(records);
        }}/>
    </Drawer>
  </>;
};

export default AddContacts;
