import React from 'react';
import * as apiUrl from '@/pages/Crm/customer/CustomerUrl';
import Select from '@/components/Select';

const OriginIdSelect = {
  url: '/origin/listSelect',
  method: 'POST'
};

const OriginSelect = (props) => {


  return (
    <Select api={OriginIdSelect}  {...props} />
  );
};
export default OriginSelect;
