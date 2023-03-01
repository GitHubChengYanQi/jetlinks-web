import React, {useState} from 'react';
import {Button, Input, message, Space, Spin, Table as AntTable, Tree, TreeSelect} from 'antd';
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
  alarmContactGroupEdit, deviceClassifyTreeList, findListByClassify,
} from '@/pages/alarm/ContactGroup/url';
import {isArray} from '@/util/Tools';
import store from '@/store';

const Edit = () => {

  const [dataSource] = store.useModel('dataSource');

  const searchParams = getSearchParams();

  const history = useHistory();

  const [name, setName] = useState('');

  const [area, setArea] = useState([]);

  const [tree, setTree] = useState([]);

  const [list, setList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [listValue, setListValue] = useState('');
  const [searchListValue, setSearchListValue] = useState('');

  const [listRows, setListRows] = useState([]);
  const [checkListRows, setCheckListRows] = useState([]);
  const [checkListValue, setCheckListValue] = useState('');
  const [searchCheckListValue, setSearchCheckListValue] = useState('');

  const [rules, setRules] = useState([]);


  const {
    loading: findListByClassifyLoading,
    run: findListByClassifyRun
  } = useRequest(findListByClassify, {
    manual: true,
    onSuccess: (res) => {
      setTree(isArray(res).map(item => {
        return {
          title: item.name,
          key: item.categoryId,
          children: isArray(item.modelResultList).map(modelItem => {
            return {
              title: modelItem.name,
              key: modelItem.modelId,
              children: isArray(modelItem.items).map(itemsItem => {
                return {
                  title: itemsItem.name,
                  key: `${modelItem.modelId}modelRuleKey${itemsItem.itemId}`,
                };
              })
            };
          })
        };
      }));
    }

  });

  const {loading: detailLoading, run: detailRun} = useRequest(alarmContactGroupDetail, {
    manual: true,
    onSuccess: (res) => {
      setName(res.name);
      const newCheckList = isArray(list).filter(item => isArray(res.contactIds).find(contactId => contactId === item.contactId));
      setCheckList(newCheckList);
      setRules(isArray(res.alarmBindResults).map(item => `${item.modelId}modelRuleKey${item.itemId}`));
      setArea(res.classifyIds);
      findListByClassifyRun({
        data: {
          classifyIds: res.classifyIds
        }
      });
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
      <Space style={{marginRight: 24}}>
        报警联系组名称：<Input placeholder="请输入组名称" value={name} onChange={({target: {value}}) => setName(value)}/>
      </Space>
      <Space>
        负责区域：
        <TreeSelect
          maxTagCount={5}
          style={{minWidth: 200}}
          treeData={dataSource.deviceClass}
          value={area}
          onChange={(value) => {
            setArea(value);
            findListByClassifyRun({
              data: {
                classifyIds: value
              }
            });
          }}
          treeCheckable
          showCheckedStrategy={TreeSelect.SHOW_ALL}
          placeholder="请选择负责区域"
        />
      </Space>
      <Button style={{float: 'right'}} loading={addLoading || editLoading} type="primary" onClick={() => {
        if (!name) {
          message.warning('请输入报警联系组名称!');
          return;
        } else if (area.length === 0) {
          message.warning('请选择负责区域!');
          return;
        } else if (checkList.length === 0) {
          message.warning('请添加报警联系人!');
          return;
        }
        const checkRules = rules.filter(item => item.indexOf('modelRuleKey') !== -1);
        const itemParams = [];
        checkRules.forEach((item) => {
          itemParams.push({
            modelId: item.split('modelRuleKey')[0],
            itemIds: [item.split('modelRuleKey')[1]]
          });
        });
        const data = {
          groupId: searchParams.groupId,
          name,
          contactIds: checkList.map(item => item.contactId),
          itemParams,
          classifyIds: area
        };
        if (searchParams.groupId) {
          editRun({data});
        } else {
          addRun({data});
        }

      }}>保存</Button>
    </div>
    <div style={{padding: '24px'}}>
      <Space align="center">
        <div className={styles.box}>
          <div className={styles.search}>
            <div className={styles.searchTitle}>选择报警联系人</div>
            <Space>
              <Input
                placeholder="请输入要搜索的内容"
                value={listValue}
                onChange={({target: {value}}) => {
                  setListValue(value);
                }}
              />
              <Button type="primary" onClick={() => setSearchListValue(listValue)}>搜索</Button>
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
              dataSource={list.filter(item => {
                return !checkList.find(checkItem => checkItem.contactId === item.contactId)
                  && (item.name.indexOf(searchListValue) !== -1
                    || item.job.indexOf(searchListValue) !== -1
                    || item.phone.indexOf(searchListValue) !== -1);
              })}
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
              <Input
                placeholder="请输入要搜索的内容"
                value={checkListValue}
                onChange={({target: {value}}) => {
                  setCheckListValue(value);
                }}
              />
              <Button type="primary" onClick={() => setSearchCheckListValue(checkListValue)}>搜索</Button>
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
              dataSource={checkList.filter(item => {
                return (item.name.indexOf(searchCheckListValue) !== -1
                  || item.job.indexOf(searchCheckListValue) !== -1
                  || item.phone.indexOf(searchCheckListValue) !== -1);
              })}
            />
          </div>
        </div>
        <LinkOutlined style={{fontSize: 24}}/>
        <div className={styles.box} style={{padding: 24}}>
          <div>关联报警设备</div>
          <div style={{paddingTop: 12}}>
            {findListByClassifyLoading ? <Spin/> : <Tree
              checkedKeys={rules}
              checkable
              selectable={false}
              treeData={tree}
              onCheck={(checkedKeys) => {
                setRules(checkedKeys);
              }}
            />}
          </div>

        </div>
      </Space>
    </div>
  </div>;
};

export default Edit;
