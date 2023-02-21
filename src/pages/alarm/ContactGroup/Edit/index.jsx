import React, {useState} from 'react';
import {Button, Input, message, Space, Table as AntTable, Tree} from 'antd';
import {ArrowLeftOutlined, ArrowRightOutlined, LinkOutlined} from '@ant-design/icons';
import ProSkeleton from '@ant-design/pro-skeleton';
import {useHistory} from 'ice';
import styles from './index.module.less';
import Render from '@/components/Render';
import style from '@/components/Table/index.module.less';
import {useRequest} from '@/util/Request';
import {contactAllList} from '@/pages/alarm/Contacts/url';
import {alarmContactGroupAdd} from '@/pages/alarm/ContactGroup/url';

const Edit = () => {

  const history = useHistory();

  const initTreeData = [
    {title: 'Expand to load', key: '0'},
    {title: 'Expand to load', key: '1'},
    {title: 'Tree Node', key: '2', isLeaf: true},
  ];

  const [name, setName] = useState('');

  const [treeData, setTreeData] = useState(initTreeData);

  const [list, setList] = useState([]);
  const [checkList, setCheckList] = useState([]);

  const [listRows, setListRows] = useState([]);
  const [checkListRows, setCheckListRows] = useState([]);

  const {loading} = useRequest(contactAllList, {
    onSuccess: (res) => {
      setList(res);
    }
  });

  const {loading: addLoading, run: addRun} = useRequest(alarmContactGroupAdd, {
    manual: true,
    onSuccess: () => {
      message.success('添加成功！');
      history.goBack();
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

  if (loading) {
    return <ProSkeleton type="descriptions"/>;
  }


  return <div style={{backgroundColor: '#fff'}}>
    <div className={styles.header}>
      <Space>
        报警联系组名称：<Input placeholder="请输入组名称" value={name} onChange={({target: {value}}) => setName(value)}/>
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
        <LinkOutlined style={{fontSize: 24}}/>
        <div className={styles.box}>
          <div>关联报警设备</div>
          <div style={{paddingTop: 12}}>
            <Tree
              checkable
              selectable={false}
              loadData={onLoadData}
              treeData={treeData}
              onCheck={(checkedKeys) => {
                console.log(checkedKeys);
              }}
            />
          </div>

        </div>
      </Space>
    </div>
    <div style={{textAlign: 'right', padding: 24}}>
      <Button loading={addLoading} type="primary" onClick={() => {
        if (!name) {
          message.warning('请输入报警联系组名称!');
          return;
        } else if (checkList.length === 0) {
          message.warning('请添加报警联系人!');
          return;
        }
        addRun({
          data: {
            name,
            contactIds: checkList.map(item => item.contactId)
          }
        });
      }}>保存</Button>
    </div>
  </div>;
};

export default Edit;
