import React, {useState} from 'react';
import {getSearchParams} from 'ice';
import {Affix, Button, Card, Input, List as AntList, Modal, Select, Space} from 'antd';
import {DeleteOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useBoolean} from 'ahooks';
import Breadcrumb from '@/components/Breadcrumb';
import {Sortable} from '@/components/Table/components/DndKit/Sortable';
import {Handle} from '@/components/Table/components/DndKit/Item';
import {List} from '@/components/Table/components/DndKit/List';
import Note from '@/components/Note';
import Message from '@/components/Message';

const Setting = () => {

  const params = getSearchParams();

  const [status, setStatus] = useState([
    {label: '发起', value: 0, actions: [], index: 0, default: true},
    {label: '完成', value: 99, actions: [], index: 1, default: true},
    {label: '拒绝', value: -1, actions: [], index: 2, default: true},
  ]);

  const [visible, setVisible] = useState();

  const [statuName, setStatuName] = useState();

  const disabled = (value) => {
    return status.filter((item) => {
      return item.actions.filter(item => item.value === value).length > 0;
    }).length > 0;
  };

  const typeObject = () => {
    switch (params.type) {
      case 'purchaseAsk':
        return {
          title: '采购申请单',
          types: [
            {label: '执行申请', value: '0',disabled:disabled('0')},
          ]
        };
      case 'PO':
        return {
          title: '采购单',
        };
      case 'SO':
        return {
          title: '销售单'
        };
      case 'instockAsk':
        return {
          title: '入库申请单',
          types: [
            {label: '处理异常', value: '-1',disabled:disabled('-1')},
            {label: '执行入库', value: '0',disabled:disabled('0')},
          ]
        };
      case 'instockError':
        return {
          title: '入库异常'
        };
      case 'outstock':
        return {
          title: '领料单'
        };
      case 'payAsk':
        return {
          title: '付款申请单'
        };
      case 'inQuality':
        return {
          title: '入厂检',
          types: [
            {label: '分派', value: '1',disabled:disabled('1')},
            {label: '执行质检', value: '2',disabled:disabled('2')},
            {label: '质检入库', value: '3',disabled:disabled('3')},
          ]
        };
      case 'productionQuality':
        return {
          title: '生产检查',
          types: [
            {label: '分派', value: '1',disabled:disabled('1')},
            {label: '执行质检', value: '2',disabled:disabled('2')},
            {label: '质检入库', value: '3',disabled:disabled('3')},
          ]
        };
      default:
        return '';
    }
  };

  const [refresh, {toggle}] = useBoolean();

  const onStatus = async (data, index, listindex, allActions) => {
    const array = status.map((item, statuIndex) => {
      if (statuIndex === listindex) {
        if (allActions) {
          return {...item, actions: allActions};
        }
        let actions;
        if (data) {
          actions = item.actions.map((item, actionIndex) => {
            if (actionIndex === index) {
              return {...item, ...data};
            }
            return item;
          });
        } else {
          actions = item.actions.filter((item, actionIndex) => actionIndex !== index);
        }

        return {...item, actions};
      }
      return item;
    });
    await setStatus(array);
    toggle();
  };

  const Item = (props) => {

    const {value, item, index, ...other} = props;

    return <Space size={8}>
      <Handle {...other} />
      <Select
        placeholder="请选择单据动作"
        value={item.value}
        style={{width: 200}}
        options={typeObject().types}
        onChange={(value, option) => {
          onStatus({title: option.label, value}, index, item.listIndex);
        }}
      />
      <Button
        danger
        style={{padding: 0}}
        type="link"
        onClick={async () => {
          onStatus(null, index, item.listIndex);
        }}>
        <DeleteOutlined />
      </Button>
    </Space>;
  };

  return <>
    <div style={{height: '100vh'}}>
      <Card title={<Breadcrumb title="单据设置" />} bordered={false} />

      <Card
        title={`设置${typeObject().title}状态`}
        bordered={false}
        bodyStyle={{overflow: 'auto'}}
      >

        <AntList
          dataSource={status}
          renderItem={(item, index) => {
            return <AntList.Item>
              <Space style={{minHeight: 60}}>
                <Button disabled={item.default} type="link" danger onClick={() => {
                  const newStatus = status.filter((item, statusIndex) => {
                    return statusIndex !== index;
                  });
                  setStatus(newStatus);
                }}>
                  <MinusCircleOutlined />
                </Button>
                <div style={{width: 150}}>
                  <Note>
                    {item.label}
                  </Note>
                </div>

                {item.actions.length > 0 && <Sortable
                  handle
                  Container={(props) => <List horizontal {...props} />}
                  DefinedItem={Item}
                  refresh={refresh}
                  items={item.actions}
                  onDragEnd={async (allIems) => {
                    onStatus(null, null, index, allIems);
                  }}
                />}
                <Button
                  style={{marginLeft:38}}
                  onClick={() => {
                    const newStatus = status.map((item, statuIndex) => {
                      if (statuIndex === index) {
                        const newActions = item.actions.map((item, index) => {
                          return {...item, key: `${index}`};
                        });
                        return {
                          ...item,
                          actions: [...newActions, {key: `${newActions.length}`, listIndex: item.index}]
                        };
                      }
                      return item;
                    });
                    setStatus(newStatus);
                    toggle();
                  }}><PlusOutlined /> 增加动作</Button>
              </Space>
            </AntList.Item>;
          }}
        />
        <Button
          style={{width: 440, margin: 'auto', display: 'block'}}
          type="primary"
          ghost
          onClick={() => {
            setStatuName('');
            setVisible(true);
          }}><PlusOutlined /> 增加状态</Button>
      </Card>

    </div>

    <Modal
      visible={visible}
      title="状态名称"
      onCancel={() => {
        setVisible(false);
      }}
      okButtonProps={{htmlType:'submit'}}
      onOk={() => {
        if (!statuName){
          return Message.warning('请输入状态名称!');
        }
        const endStatus = status[status.length - 1];
        setStatus([...status, {label: statuName, value: `${endStatus.value + 1}`, actions: [], index: status.length}]);
        setVisible(false);
      }}>
      <Input
        placeholder="请输入状态名称"
        value={statuName}
        onChange={(value) => {
          setStatuName(value.target.value);
        }} />
    </Modal>

    <Affix offsetBottom={0}>
      <div
        style={{
          height: 47,
          borderTop: '1px solid #e7e7e7',
          background: '#fff',
          textAlign: 'right',
          paddingTop: 8,
          paddingRight: 24,
          boxShadow: '0 0 8px 0 rgb(0 0 0 / 10%)'
        }}>
        <Space>
          <Button type="primary" onClick={() => {

          }}>保存</Button>
        </Space>
      </div>
    </Affix>
  </>;
};

export default Setting;
