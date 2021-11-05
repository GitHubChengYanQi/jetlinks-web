import Icon from '@/components/Icon';
import {Button, Col, Dropdown, Input, Menu, Modal, notification, Row, Select, Space, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {useBoolean} from 'ahooks';
import {useRequest} from '@/util/Request';
import {tableViewAdd, tableViewDetail, tableViewListSelect} from '@/hook/useTableSet/components/TableViewUrl';
import {CheckOutlined, UnorderedListOutlined} from '@ant-design/icons';

const md5 = require('md5');

/**
 * 设置表格列的hook
 * @param column
 * @returns {{setButton: JSX.Element, tableColumn}}
 */

const useTableSet = (column, tableKey) => {

  const md5TableKey = () => {
    let keys = '';
    column && column.map((items, index) => {
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

  const [state, {setTrue, setFalse}] = useBoolean();

  const [showModal, setShowModal] = useState();


  const openNotificationWithIcon = type => {
    notification[type]({
      message: type === 'success' ? '保存成功！' : '保存失败!',
    });
  };

  const {loading, data, refresh} = useRequest({...tableViewListSelect, data: {tableKey: md5TableKey()}});

  const {run: viewAdd} = useRequest(tableViewAdd,
    {
      manual: true,
      onSuccess: (res) => {

        if (res) {
          localStorage.setItem(md5TableKey(), res);
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
        if (res.field) {
          if (res.tableKey === md5TableKey()) {
            select(JSON.parse(res.field));
          }
        }
      }
    });


  const [visible, setVisible] = useState();

  const checks = (items) => {
    const checked = tableColumn && tableColumn.filter((value) => {
      return value.key === items.key;
    });
    return checked.length > 0 && <CheckOutlined />;
  };

  const menu = (
    <Menu
      style={{minWidth: 290}}
      multiple
      selectedKeys={tableColumn && tableColumn.map((items) => {
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
        column && column.map((items) => {
          if (!items.props.fixed && items.key) {
            return (
              <Menu.Item style={{background:'#fff'}} key={items.key}>
                <Row gutter={24}>
                  <Col span={2}>
                    <UnorderedListOutlined />
                  </Col>
                  <Col span={19}>
                    {items.props.title}
                  </Col>
                  <Col span={2}>
                    {checks(items)}
                  </Col>
                </Row>
              </Menu.Item>
            );
          } else {
            return null;
          }
        })
      }
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
    setButton:tableKey &&
      <>
        {state &&
        <Button
          style={{marginRight: 8}}
          onClick={() => {
            setShowModal(true);
          }}>保存视图</Button>}

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

            }} defaultValue={view} />}

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
