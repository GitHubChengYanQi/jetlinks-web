import Icon from '@/components/Icon';
import {Button, Col, Dropdown, Input, Menu, message, Modal, notification, Row, Select, Space, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {useBoolean} from 'ahooks';
import {useRequest} from '@/util/Request';
import {
  tableViewAdd,
  tableViewDetail,
  tableViewEdit,
  tableViewListSelect
} from '@/hook/useTableSet/components/TableViewUrl';
import {CheckOutlined, ExclamationCircleOutlined, UnorderedListOutlined} from '@ant-design/icons';

const md5 = require('md5');

/**
 * 设置表格列的hook
 * @param column
 * @returns {{setButton: JSX.Element, tableColumn}}
 */

const useTableSet = (column, tableKey) => {

  const md5TableKey = () => {
    let keys = '';
    column && column.length > 0 && column.map((items, index) => {
      if (index === column.length - 1) {
        return keys += `${items.key}`;
      } else {
        return keys += `${items.key}_`;
      }
    });
    return md5(tableKey + keys);
  };

  const view = localStorage.getItem(md5TableKey());

  const [name, setName] = useState();

  const [detail, setDetail] = useState();

  const [state, {setTrue, setFalse}] = useBoolean();

  const [showModal, setShowModal] = useState();


  const openNotificationWithIcon = type => {
    notification[type]({
      message: type === 'success' ? '保存成功！' : '保存失败!',
    });
  };

  const {loading, data, refresh} = useRequest({...tableViewListSelect, data: {tableKey: md5TableKey()}});

  const {run} = useRequest(tableViewEdit, {
    manual: true,
    onSuccess: () => {
      setFalse();
      refresh();
    }
  });

  const {run: viewAdd} = useRequest(tableViewAdd,
    {
      manual: true,
      onSuccess: (res) => {
        if (res){
          setDetail(res);
        }

        if (res.tableViewId) {
          localStorage.setItem(md5TableKey(), res.tableViewId);
        }

        setFalse();
        refresh();
        openNotificationWithIcon('success');
      },
      onError: () => {
        openNotificationWithIcon('error');
      }
    });

  const [tableColumn, setTableColumn] = useState(column);

  const select = (selectedKeys) => {
    const selectView = column.filter((value) => {
      let column = false;
      selectedKeys.map((items) => {
        if (items === value.key) {
          return column = true;
        } else {
          return null;
        }
      });
      return column;
    });
    setTableColumn(selectView);
  };

  const {run: viewDetail} = useRequest(tableViewDetail,
    {
      manual: true,
      onSuccess: (res) => {
        if (res) {
          setDetail(res);
          if (res.field) {
            if (res.tableKey === md5TableKey()) {
              select(JSON.parse(res.field));
            }
          }
        }
      }
    });


  const [visible, setVisible] = useState();

  const checks = (items) => {
    const checked = tableColumn && tableColumn.length > 0 && tableColumn.filter((value) => {
      return value.key === items.key;
    });
    return checked.length > 0 && <CheckOutlined />;
  };


  const cover = async () => {
    if (detail) {
      Modal.confirm({
        title: '覆盖当前视图',
        icon: <ExclamationCircleOutlined />,
        content: `更改视图展现的内容，确定覆盖视图「${detail.name}」？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          const columnKeys = tableColumn && tableColumn.map((items) => {
            return items.key;
          });
          run({
            data: {
              tableViewId: detail.tableViewId,
              field: columnKeys,
            }
          });
        }
      });
    } else {
      message.error('未选中当前视图！');
    }

  };

  const menu = (
    <Menu
      style={{minWidth: 220}}
      multiple
      selectedKeys={tableColumn && tableColumn.length > 0 && tableColumn.map((items) => {
        return items.key;
      })}
      selectable
      onDeselect={(value) => {
        setTrue();
        select(value.selectedKeys);
      }}
      onSelect={(value) => {
        setTrue();
        select(value.selectedKeys);
      }}
    >
      {
        column && column.length > 0 && column.map((items) => {
          if (!items.props.fixed && items.key) {
            return (
              <Menu.Item style={{background: '#fff', color: '#000'}} key={items.key}>
                <UnorderedListOutlined />
                &nbsp;
                {items.props.title}
                <span style={{float: 'right'}}>{checks(items)}</span>
              </Menu.Item>
            );
          } else {
            return null;
          }
        })
      }
    </Menu>
  );

  const save = (
    <Menu
      style={{minWidth: 220}}
      onClick={(value) => {
        if (value.key === '0') {
          setShowModal(true);
        } else if (value.key === '1') {
          cover();
        }
      }}
    >
      <Menu.Item key={0}>
        另存为新视图
      </Menu.Item>
      <Menu.Item key={1} disabled={!detail}>
        覆盖当前视图
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (view) {
      viewDetail({
        data: {
          tableViewId: view,
        }
      });
    }
  }, []);

  return {
    tableColumn,
    setButton: tableKey &&
      <>
        {state &&
        <Dropdown overlay={save} placement="bottomLeft" trigger={['click']}>
          <Button style={{marginRight: 8}}>保存视图</Button>
        </Dropdown>}

        {loading ?
          <Spin />
          :
          <Select
            options={data}
            style={{minWidth: 200}}
            loading={loading}
            placeholder="选择视图"
            bordered={false}
            onSelect={(value) => {

              localStorage.setItem(md5TableKey(), value);

              viewDetail({
                data: {
                  tableViewId: value,
                }
              });

            }}
            value={detail && detail.tableViewId} />}

        <Dropdown overlay={menu} onVisibleChange={(value) => {
          setVisible(value);
        }} visible={visible} placement="bottomRight" trigger={['click']}>
          <Button type="text" onClick={() => {
            setVisible(true);
          }}><Icon type="icon-xitongpeizhi" />设置列</Button>
        </Dropdown>

        <Modal
          title="保存视图"
          visible={showModal}
          footer={[
            <Button
              type="primary"
              key={1}
              onClick={() => {
                const columnKeys = tableColumn && tableColumn.map((items) => {
                  return items.key;
                });
                viewAdd({
                  data: {
                    tableKey: md5TableKey(),
                    field: columnKeys,
                    name,
                  }
                });
                setShowModal(false);
              }}>保存</Button>
          ]}
          onCancel={() => {
            setShowModal(false);
          }}>

          <Space direction="vertical" style={{width: '100%'}}>
            <span style={{color: '#a6a2a2'}}>将当前的展示方式、排序方式保存为视图。</span>
            <Input maxLength={20} style={{width: '100%'}} placeholder="请输入视图名称(最多20字)" onChange={(value) => {
              setName(value.target.value);
            }} />
          </Space>
        </Modal>
      </>
  };
};

export default useTableSet;
