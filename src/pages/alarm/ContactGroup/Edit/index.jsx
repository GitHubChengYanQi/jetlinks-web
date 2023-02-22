import React, {useState} from 'react';
import {Button, Input, message, Space, Spin, Table as AntTable, Tree} from 'antd';
import {ArrowLeftOutlined, ArrowRightOutlined, LinkOutlined} from '@ant-design/icons';
import ProSkeleton from '@ant-design/pro-skeleton';
import {getSearchParams, useHistory} from 'ice';
import styles from './index.module.less';
import Render from '@/components/Render';
import style from '@/components/Table/index.module.less';
import {useRequest} from '@/util/Request';
import {contactAllList} from '@/pages/alarm/Contacts/url';
import {
  alarmContactGroupAdd,
  alarmContactGroupDetail,
  alarmContactGroupEdit, deviceClassifyTreeList,
} from '@/pages/alarm/ContactGroup/url';
import {isArray} from '@/util/Tools';

const Edit = () => {

  const searchParams = getSearchParams();

  const history = useHistory();

  const [name, setName] = useState('');

  const [treeData, setTreeData] = useState([]);

  const [list, setList] = useState([]);
  const [checkList, setCheckList] = useState([]);

  const [listRows, setListRows] = useState([]);
  const [checkListRows, setCheckListRows] = useState([]);

  const {loading: detailLoading, run: detailRun} = useRequest(alarmContactGroupDetail, {
    manual: true,
    onSuccess: (res) => {
      setName(res.name);
      const newCheckList = isArray(list).filter(item => isArray(res.contactIds).find(contactId => contactId === item.contactId));
      setCheckList(newCheckList);
    }
  });

  const formatTree = (data) => {
    return isArray(data).map(item => {
      const classifyId = item.classifyId;
      return {
        title: item.name,
        key: item.classifyId,
        children: [
          ...formatTree(item.child),
          ...isArray(item.categoryResults).map(item => {
            return {
              title: item.name,
              key: `${classifyId}classKey${item.categoryId}`,
              children: isArray(item.modelResultList).map(item => {
                const modelId = item.modelId;
                return {
                  title: item.name,
                  key: `${classifyId}modelKey${modelId}`,
                  children: isArray(item.items).map(item => ({
                    title: item.name,
                    key: `${classifyId}modelKey${modelId}ruleKey${item.itemKey}`
                  }))
                };
              })
            };
          }),
        ]
      };
    });
  };

  const {loading: treeLoading} = useRequest(deviceClassifyTreeList, {
    onSuccess: (res) => {
      setTreeData(formatTree(res));
    }
  });

  const {loading} = useRequest(contactAllList, {
    onSuccess: (res) => {
      if (searchParams.groupId) {
        detailRun({data: {groupId: searchParams.groupId}});
      }
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

  const {loading: editLoading, run: editRun} = useRequest(alarmContactGroupEdit, {
    manual: true,
    onSuccess: () => {
      message.success('修改成功！');
      history.goBack();
    }
  });

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

  if (loading || detailLoading) {
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
        <div className={styles.box} style={{padding: 24}}>
          <div>关联报警设备</div>
          <div style={{paddingTop: 12}}>
            {treeLoading ? <Spin/> : <Tree
              // checkedKeys={['3333']}
              checkable
              selectable={false}
              treeData={treeData}
              onCheck={(checkedKeys) => {
                console.log(checkedKeys);
              }}
            />}
          </div>

        </div>
      </Space>
    </div>
    <div style={{textAlign: 'right', padding: 24}}>
      <Button loading={addLoading || editLoading} type="primary" onClick={() => {
        if (!name) {
          message.warning('请输入报警联系组名称!');
          return;
        } else if (checkList.length === 0) {
          message.warning('请添加报警联系人!');
          return;
        }
        const data = {
          groupId: searchParams.groupId,
          name,
          contactIds: checkList.map(item => item.contactId)
        };
        if (searchParams.groupId) {
          editRun({data});
        } else {
          addRun({data});
        }

      }}>保存</Button>
    </div>
  </div>;
};

export default Edit;
