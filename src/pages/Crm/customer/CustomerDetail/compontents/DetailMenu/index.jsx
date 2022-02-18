import {Button, Dropdown, Input, Menu, Modal, Modal as AntModal, notification, Space} from 'antd';
import React, {useRef, useState} from 'react';
import {useHistory} from 'ice';
import {useRequest} from '@/util/Request';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import {supplierBlacklistAdd} from '@/pages/Crm/supplierBlacklist/supplierBlacklistUrl';

const DetailMenu = ({data, deletaApi, url, refresh, type, supply,}) => {
  const history = useHistory();

  const [visible, setVisible] = useState();

  const [note, setNote] = useState();

  const openNotificationWithIcon = (status, supplierBlack) => {
    let message = '';
    switch (status) {
      case 'success':
        message = supplierBlack ? '已加入黑名单!' : '已删除！';
        break;
      case 'error':
        message = supplierBlack ? '加入黑名单失败！' : '删除失败！';
        break;
      default:
        break;
    }
    notification[status]({
      message,
    });
    if (status === 'success') {
      history.push(url);
    }
  };

  const {run} = useRequest(deletaApi, {
    manual: true, onSuccess: () => {
      openNotificationWithIcon('success');
    },
    onError: () => {
      openNotificationWithIcon('error');
    }
  });

  const {run: supplierBlack} = useRequest(supplierBlacklistAdd, {
    manual: true, onSuccess: () => {
      openNotificationWithIcon('success', supplierBlack);
    },
    onError: () => {
      openNotificationWithIcon('error', supplierBlack);
    }
  });


  const deleteCustomer = () => {
    AntModal.confirm({
      title: '温馨提示',
      centered: true,
      content: '删除后不可恢复，是否确认删除？',
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        await run({
          data: {
            ...data
          }
        });
      }
    });
  };

  const module = () => {
    switch (type) {
      case 'customer':
        return <>
          {supply && <Menu.Item key="2" onClick={() => {
            setVisible(true);
          }}>加入黑名单</Menu.Item>}
          <Menu.Item danger key="delete" onClick={() => {
            deleteCustomer();
          }}>删除客户</Menu.Item>
        </>;
      case 'bussiness':
        return <>
          <Menu.Item danger key="delete" onClick={() => {
            deleteCustomer();
          }}>删除项目</Menu.Item>
        </>;
      default:
        break;
    }
  };

  return (
    <>
      <Dropdown trigger="click" placement="bottomCenter" overlay={
        <Menu>
          {module()}
        </Menu>
      }>
        <Button type="text">
          管理
        </Button>
      </Dropdown>

      <Modal
        title={`确定要将【 ${data.customerName} 】拉入黑名单吗？`}
        visible={visible}
        footer={[
          <Button
            type="primary"
            danger
            key={1}
            onClick={() => {
              supplierBlack({
                data: {
                  supplierId: data.customerId,
                  remark: note
                }
              });
            }}>拉入黑名单</Button>
        ]}
        onCancel={() => {
          setVisible(false);
        }}>

        <Space direction="vertical" style={{width: '100%'}}>
          <Input maxLength={20} style={{width: '100%'}} placeholder="请输入备注..." onChange={(value) => {
            setNote(value.target.value);
          }} />
        </Space>
      </Modal>
    </>
  );
};
export default DetailMenu;
