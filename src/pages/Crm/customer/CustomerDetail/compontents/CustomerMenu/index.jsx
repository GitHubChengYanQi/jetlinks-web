import {Button, Dropdown, Menu, Modal as AntModal, notification} from 'antd';
import React from 'react';
import {useRequest} from '@/util/Request';
import {customerDelete} from '@/pages/Crm/customer/CustomerUrl';
import {useHistory} from 'ice';

const CustomerMenu = ({data}) => {

  const history = useHistory();

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: type === 'success' ? '已删除客户！' : '删除客户失败！',
    });
    if (type === 'success'){
      history.push('/CRM/customer');
    }
  };

  const {run} = useRequest(customerDelete, {
    manual: true, onSuccess: () => {
      openNotificationWithIcon('success');
    },
    onError:()=>{
      openNotificationWithIcon('error');
    }
  });


  const deleteCustomer = () => {
    AntModal.confirm({
      title: '温馨提示',
      centered: true,
      content: `删除后不可恢复，是否确认删除？`,
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        await run({
          data: {
            customerId: data.customerId
          }
        });
      }
    });
  };

  return (
    <Dropdown trigger="click" placement="bottomCenter" overlay={
      <Menu>
        <Menu.Item danger key="delete" onClick={() => {
          deleteCustomer();
        }}>删除客户</Menu.Item>
      </Menu>
    }>
      <Button type="text">
        管理
      </Button>
    </Dropdown>
  );
};
export default CustomerMenu;
