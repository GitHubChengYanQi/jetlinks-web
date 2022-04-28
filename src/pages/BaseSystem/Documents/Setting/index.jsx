import React, {useEffect, useState} from 'react';
import {getSearchParams} from 'ice';
import {Affix, Button, Card, Input, List, Modal, Select, Space} from 'antd';
import {DeleteOutlined, MenuOutlined, PlusOutlined} from '@ant-design/icons';
import {useBoolean} from 'ahooks';
import Breadcrumb from '@/components/Breadcrumb';
import {Sortable} from '@/components/Table/components/DndKit/Sortable';
import {Handle} from '@/components/Table/components/DndKit/Item';

export const Inp = ({value, onChange}) => {

  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  return <Input
    value={val}
    placeholder="单据状态"
    onChange={(value) => {
      setVal(value.target.value);
    }}
    onBlur={() => {
      onChange(val);
    }}
  />;

};

const Setting = () => {

  const params = getSearchParams();

  const [status, setStatus] = useState([
    {label: '发起', value: 0},
    {label: '完成', value: 99},
    {label: '拒绝', value: -1},
  ]);

  const [visible, setVisible] = useState();

  const [statuName, setStatuName] = useState();

  const typeObject = () => {
    switch (params.type) {
      case 'purchaseAsk':
        return {
          title: '采购申请',
          types: [
            {label: '发起采购申请', value: 0},
            {label: '采购申请完成', value: 99},
          ]
        };
      case 'PO':
        return {
          title: '采购单',
          types: [
            {label: '发起采购单', value: 1},
          ]
        };
      case 'SO':
        return {
          title: '销售单'
        };
      case 'instockAsk':
        return {
          title: '入库申请单',
          types: [
            {label: '已拒绝', value: -1},
            {label: '审批中', value: 0},
            {label: '待入库', value: 1},
            {label: '异常审批中', value: 49},
            {label: '异常审批拒绝', value: 50},
            {label: '进行中', value: 98},
            {label: '入库完成', value: 99},
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
            {label: '已拒绝', value: -1},
            {label: '新建', value: 0},
            {label: '分派', value: 1},
            {label: '完成', value: 2},
            {label: '已入库', value: 3},
          ]
        };
      case 'productionQuality':
        return {
          title: '生产检查',
          types: [
            {label: '已拒绝', value: -1},
            {label: '新建', value: 0},
            {label: '分派', value: 1},
            {label: '完成', value: 2},
            {label: '已入库', value: 3},
          ]
        };
      default:
        return '';
    }
  };

  const [refresh, {toggle}] = useBoolean();

  const [statusList, setStatusList] = useState([]);

  // const setStatus = async (data, index) => {
  //   const array = statusList.filter(() => true);
  //   array[index] = {...array[index], ...data};
  //   await setStatusList(array);
  //   toggle();
  // };

  const Item = (props) => {
    const {value, item, index, ...other} = props;
    return <Space size={8}>
      <Handle icon={<MenuOutlined />} {...other} />
      <Inp
        value={value}
        onChange={(value) => {
          setStatus({title: value}, index);
        }}
      />
      <Select
        placeholder="请选择单据动作"
        value={item.formStatus}
        style={{width: 200}}
        options={typeObject().types}
        onChange={(value) => {
          setStatus({formStatus: value}, index);
        }}
      />
      <Button
        danger
        style={{padding: 0}}
        type="link"
        onClick={async () => {
          const array = statusList.filter((item, skuIndex) => {
            return skuIndex !== index;
          });
          await setStatusList(array);
          await toggle();
        }}>
        <DeleteOutlined />
      </Button>
    </Space>;
  };

  return <>
    <div style={{height: '100vh'}}>
      <Card title={<Breadcrumb title="单据设置" />} bordered={false} />

      <Card title={`设置${typeObject().title}单据状态`} bordered={false} style={{width: 1250, margin: 'auto'}}>

        <List
          dataSource={status}
          renderItem={(item, index) => {
            return <List.Item>
              {item.label}
            </List.Item>;
          }}
        />
        <Button
          style={{width: 440, margin: 'auto', display: 'block'}}
          type="primary"
          ghost
          onClick={() => {
            setVisible(true);
            // const endList = statusList[statusList.length - 1];
            // setStatusList([...statusList, {title: '', key: `${endList ? endList.key + 1 : 0}`}]);
            // toggle();
          }}><PlusOutlined /> 增加状态</Button>
      </Card>
    </div>

    <Modal
      visible={visible}
      title="状态名称"
      onCancel={() => {
        setVisible(false);
      }}
      onOk={() => {
        const endStatus = status[status.length - 1];
        setStatus([...status, {label: statuName, value: `${endStatus.value + 1}`}]);
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
