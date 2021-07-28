import React from 'react';
import {Select as AntSelect, Button} from 'antd';
import {useRequest} from '@/util/Request';
import {RedoOutlined} from '@ant-design/icons';
import {Option} from 'antd/lib/mentions';

const Select2 = (data,props) => {
    return (
      <>
        <AntSelect options={data} style={{ width: 200 }}  showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}  {...props} />
      </>
    );
};

export default Select2;
