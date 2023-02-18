import React, {useState} from 'react';
import {Button, Input, Space, Table as AntTable, Tree} from 'antd';
import {ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import styles from './index.module.less';
import Render from '@/components/Render';
import style from '@/components/Table/index.module.less';
import {useRequest} from '@/util/Request';
import {contactList} from '@/pages/alarm/Contacts/url';

const Edit = () => {

  const initTreeData = [
    {title: 'Expand to load', key: '0'},
    {title: 'Expand to load', key: '1'},
    {title: 'Tree Node', key: '2', isLeaf: true},
  ];

  const [treeData, setTreeData] = useState(initTreeData);

  const [list, setList] = useState([]);
  const [checkList, setCheckList] = useState([]);

  const [listRows, setListRows] = useState([]);
  const [checkListRows, setCheckListRows] = useState([]);

  const {loading} = useRequest(contactList, {
    onSuccess: (res) => {
      setList(res);
    }
  });

  const updateTreeData = (list, key, children) =>
    list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const onLoadData = ({key, children}) => {
    return new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, key, [
            {title: 'Child Node', key: `${key}-0`},
            {title: 'Child Node', key: `${key}-1`},
          ]),
        );

        resolve();
      }, 1000);
    });
  };

  const columns = [
    {title: '姓名', dataIndex: 'name', align: 'center', width: 100, render: (text) => <Render width={100} text={text}/>},
    {
      title: '职务',
      dataIndex: 'job',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      align: 'center',
      width: 100,
      render: (text) => <Render width={100} text={text}/>
    },
    {
      title: '电子邮箱',
      dataIndex: 'mail',
      align: 'center',
      width: 100,
      render: (text) => <Render width={100} text={text}/>
    },
  ];


  return <div style={{backgroundColor: '#fff'}}>
    <div className={styles.header}>
      <Space>
        报警联系组名称：<Input placeholder="请输入组名称"/>
      </Space>
    </div>
    <div style={{padding: '24px'}}>
      <Space align="center">
        <div className={styles.box}>
          <div className={styles.search}>
            <div className={styles.searchTitle}>选择报警联系人</div>
            <Space>
              <Input placeholder="请输入要搜索的内容"/>
              <Button type="primary">搜索</Button>
            </Space>
          </div>
          <div className={styles.table}>
            <AntTable
              rowSelection={{
                selectedRowKeys: listRows.map(item => item.contactId),
                onChange: (row, selectedRows) => {
                  setListRows(selectedRows);
                }
              }}
              pagination={false}
              onHeaderRow={() => {
                return {
                  className: style.headerRow
                };
              }}
              rowKey="contactId"
              columns={columns}
              dataSource={list.filter(item => !checkList.find(checkItem => checkItem.contactId === item.contactId))}
            />
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            type="link"
            disabled={listRows.length === 0}
            onClick={() => {
              setListRows([]);
              setCheckList([...checkList, ...listRows]);
            }}
          >
            <ArrowRightOutlined/>
          </Button>
          <Button
            type="link"
            disabled={checkListRows.length === 0}
            onClick={() => {
              setCheckListRows([]);
              setCheckList(checkList.filter(item => !checkListRows.find(checkItem => checkItem.contactId === item.contactId)));
            }}
          >
            <ArrowLeftOutlined/>
          </Button>
        </div>
        <div className={styles.box}>
          <div className={styles.search}>
            <div className={styles.searchTitle}>已添加的报警联系人</div>
            <Space>
              <Input placeholder="请输入要搜索的内容"/>
              <Button type="primary">搜索</Button>
            </Space>
          </div>
          <div className={styles.table}>
            <AntTable
              rowSelection={{
                selectedRowKeys: checkListRows.map(item => item.contactId),
                onChange: (row, selectedRows) => {
                  setCheckListRows(selectedRows);
                }
              }}
              rowKey="contactId"
              pagination={false}
              onHeaderRow={() => {
                return {
                  className: style.headerRow
                };
              }}
              columns={columns}
              dataSource={checkList}
            />
          </div>
        </div>
        <div className={styles.box}>
          <Tree checkable selectable={false} loadData={onLoadData} treeData={treeData}/>
        </div>
      </Space>
    </div>
  </div>;
};

export default Edit;
