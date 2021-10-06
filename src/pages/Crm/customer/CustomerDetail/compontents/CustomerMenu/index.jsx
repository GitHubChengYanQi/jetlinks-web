import {Button, Dropdown, Menu, Modal as AntModal, notification} from 'antd';
import React, {useRef} from 'react';
import {useRequest} from '@/util/Request';
import {customerDelete} from '@/pages/Crm/customer/CustomerUrl';
import {useHistory} from 'ice';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';

const CustomerMenu = ({data,title,api,url,edit}) => {
  const ref = useRef(null);
  const history = useHistory();

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: type === 'success' ? '已删除！' : '删除失败！',
    });
    if (type === 'success'){
      history.push(url);
    }
  };

  const {run} = useRequest(api, {
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
            ...data
          }
        });
      }
    });
  };

  return (
    <Dropdown trigger="click" placement="bottomCenter" overlay={
      <Menu>
        {edit && <Menu.Item key="1" onClick={() => {
          ref.current.open(data.customerId);
        }}>编辑</Menu.Item>}
        <CreateNewCustomer title="客户" model={CustomerEdit} widths={800} onSuccess={() => {
          ref.current.close();
        }} ref={ref} />
        <Menu.Item danger key="delete" onClick={() => {
          deleteCustomer();
        }}>{title || '删除客户'}</Menu.Item>
      </Menu>
    }>
      <Button type="text">
        管理
      </Button>

    </Dropdown>

  );
};
export default CustomerMenu;
