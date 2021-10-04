import {useRequest} from '@/util/Request';
import * as SysField from '@/pages/Crm/contract/ContractField';
import React, {useState} from 'react';
import {FormItem} from '@formily/antd';


const CustomerAll = ({customerId,customer,contacts,adress,phone}) => {

  const {refresh: refreshContactsn, data: Contacts, run: ContactsRun} = useRequest({
    url: '/contacts/list',
    method: 'POST',
    data: {
      customerId,
    }
  }, {manual: true});
  const {refresh: refreshPhone, data: Phone, run: runPhone} = useRequest({
    url: '/phone/list',
    method: 'POST',
  }, {manual: true});
  const {refresh: refreshAdress, data: Adress, run: AdressRun} = useRequest({
    url: '/adress/list',
    method: 'POST',
    data: {
      customerId
    }
  }, {manual: true});

  const [customerIds, setCustomerIds] = useState();
  const [contactsIdA, setContactIdsA] = useState();

  const refresh = () => {
    refreshContactsn();
    refreshAdress();
    refreshPhone();
  };

  return (
    <>
      {customerId ?
        <FormItem
          label="客户"
          name={customer || 'customerId'}
          value={customerId}
          component={SysField.CustomerId}
          placeholder="请选择客户"
          customers={async (customer) => {
            setCustomerIds(customer);
            if (customer) {
              await ContactsRun({
                data: {
                  customerId: customer
                }
              });
              await AdressRun({
                data: {
                  customerId: customer
                }
              });
            }
          }}
          required
        /> : <FormItem
          label="客户"
          name={customer || 'customerId'}
          component={SysField.Customer}
          placeholder="请选择客户"
          refresh={() => {
            refresh();
          }}
          customers={async (customer) => {
            setCustomerIds(customer);
            if (customer) {
              await ContactsRun({
                data: {
                  customerId: customer
                }
              });
              await AdressRun({
                data: {
                  customerId: customer
                }
              });
            }
          }}
          required
        />}
      <FormItem
        label="联系人"
        name={contacts || 'contactsId'}
        component={SysField.Contacts}
        placeholder="请选择联系人"
        refresh={() => {
          refresh();
        }}
        customerId={customerId || customerIds}
        customers={Contacts || null}
        contact={async (contacts) => {
          setContactIdsA(contacts);
          if (contacts) {
            await runPhone({
              data: {
                contactsId: contacts
              }
            });
          }
        }}
        required
      />
      <FormItem
        label="电话"
        name={phone || 'phoneId'}
        refresh={() => {
          refresh();
        }}
        component={SysField.Phone}
        contactsId={contactsIdA}
        placeholder="请选择电话"
        contacts={Phone || null}
        required
      />
      <FormItem
        label="地址"
        refresh={() => {
          refresh();
        }}
        name={adress || 'adressId'}
        customerId={customerId || customerIds}
        component={SysField.Adress}
        placeholder="请选择地址"
        customers={Adress || null}
        required
      />
    </>
  );
};

export default CustomerAll;
