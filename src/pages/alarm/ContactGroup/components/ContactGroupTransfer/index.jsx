import {Spin, Transfer} from 'antd';
import React, {useState} from 'react';
import {useRequest} from '@/util/Request';
import {alarmContactFindAll} from '@/pages/alarm/ContactGroup/url';

const ContactGroupTransfer = ({
  value,
  onChange = () => {
  }
}) => {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);

  const {loading} = useRequest(
    alarmContactFindAll,
    {
      onSuccess: (res) => {
        const alarmContacts = res || [];
        setTargetKeys(value || []);
        setMockData(alarmContacts.map(item => ({key: item.groupId, title: item.name})));
      }
    }
  );

  const filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys) => {
    onChange(newTargetKeys);
    setTargetKeys(newTargetKeys);
  };

  if (loading) {
    return <Spin spinning/>;
  }

  return (
    <Transfer
      titles={['待选报警组', '已关联报警组']}
      listStyle={{
        width: 300,
        height: 400,
      }}
      dataSource={mockData}
      showSearch
      filterOption={filterOption}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={(item) => item.title}
    />
  );
};
export default ContactGroupTransfer;
