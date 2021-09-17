import {Button, Dropdown, Menu, Popover} from 'antd';
import FastCreateCustomer from '@/pages/Crm/customer/components/FastCreateCustomer';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';
import React, {useEffect, useRef, useState} from 'react';


const AddCustomerButton = (props) => {


  const {onChange, visi} = props;

  const ref = useRef(null);

  useEffect(() => {
    setVisible(false);
  }, [visi]);


  const [visible, setVisible] = useState(false);

  const [drow, setDrow] = useState();

  const menu = (
    <Menu style={{padding: 0}}>
      <Menu.Item key="1" style={{padding: 0}}>
        <Button ghost type="primary" onClick={() => {
          setDrow(false);
          ref.current.open(false);
        }}>创建客户</Button>
      </Menu.Item>
      <Menu.Item key="2" style={{padding: 0}}>
        <Popover placement="rightTop" visible={visible} onVisibleChange={(visible) => {
          setVisible(visible);
        }} content={<FastCreateCustomer close={() => {
          setDrow(false);
          setVisible(false);
        }} add={(value) => {
          setDrow(false);
          setVisible(false);
          onChange(value);
        }} />} trigger="click">
          <Button danger onClick={() => {
            setVisible(true);
          }}>快速创建</Button>
        </Popover>
      </Menu.Item>
    </Menu>
  );


  return (
    <>
      <Dropdown overlay={menu} trigger="click" destroyPopupOnHide visible={drow} onVisibleChange={(visible) => {
        setDrow(visible);
      }}>
        <Button
          type="primary"
          style={{backgroundColor: '#1890ff', color: '#fff'}}
          onClick={() => {
            if (drow)
              setDrow(false);
            else
              setDrow(true);
          }}>新增客户</Button>
      </Dropdown>


      <CreateNewCustomer
        title="客户"
        widths={1600}
        onSuccess={() => {
          ref.current.close();
        }}
        ref={ref}
        onChange={(res) => {
          onChange(res.data);
        }} />
    </>
  );
};

export default AddCustomerButton;
