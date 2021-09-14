import {AutoComplete, Button, Divider, Dropdown, Menu, Popover} from 'antd';
import FastCreateCustomer from '@/pages/Crm/customer/components/FastCreateCustomer';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import React, {useEffect, useRef, useState} from 'react';


const AddCustomer = (props) => {


  const {onChange, visi, setVal} = props;

  const ref = useRef(null);

  useEffect(() => {
    setVisible(false);
  }, [visi]);


  const [visible, setVisible] = useState(false);

  const [drow, setDrow] = useState();

  const content = (
    <>
      <Button type="primary" style={{backgroundColor: '#1890ff', color: '#fff'}} onClick={() => {
        ref.current.open(false);
      }}>创建客户</Button>
      <Divider style={{margin: 5}} />
      <Popover placement="rightTop" visible={visible} content={<FastCreateCustomer close={() => {
        setVisible(false);
      }} add={(value) => {
        setVisible(false);
        typeof setVal === 'function' && setVal(value && value.customerName);
        onChange(value && value.customerId);
      }} />} trigger="click">
        <Button type="primary" style={{backgroundColor: '#1890ff', color: '#fff'}} onClick={() => {
          setVisible(true);
        }}>快速创建</Button>
      </Popover>
    </>
  );

  const menu = (
    <Menu style={{padding: 0}}>
      <Menu.Item key="1" style={{padding: 0}}>
        <Button type="primary" style={{backgroundColor: '#1890ff', color: '#fff'}} onClick={() => {
          setDrow(false);
          ref.current.open(false);
        }}>创建客户</Button>
      </Menu.Item>
      <Menu.Item key="2" style={{padding: 0}}>
        <Popover placement="rightTop" visible={visible} onVisibleChange={(visible)=>{
          setVisible(visible);
        }} content={<FastCreateCustomer close={() => {
          setDrow(false);
          setVisible(false);
        }} add={(value) => {
          setDrow(false);
          setVisible(false);
          typeof setVal === 'function' && setVal(value && value.customerName);
          onChange(value && value.customerId);
        }} />} trigger="click">
          <Button type="primary" style={{backgroundColor: '#1890ff', color: '#fff'}} onClick={() => {
            setVisible(true);
          }}>快速创建</Button>
        </Popover>
      </Menu.Item>
    </Menu>
  );


  return (
    <>
      <Dropdown overlay={menu} trigger="click" destroyPopupOnHide visible={drow} onVisibleChange={(visible)=>{
        setDrow(visible);
      } }>
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
        model={CustomerEdit}
        widths={1600}
        onSuccess={() => {
          ref.current.close();
        }}
        refModal={ref}
        onChange={(res) => {
          if (res) {
            typeof setVal === 'function' && setVal(res && res.data && res.data.customerName);
            onChange(res && res.data && res.data.customerId);
          }
        }} />
    </>
  );
};

export default AddCustomer;
