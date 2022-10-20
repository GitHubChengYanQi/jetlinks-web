import {Spin, Transfer} from 'antd';
import React, {useState} from 'react';
import {useRequest} from '@/util/Request';
import {userAllList} from '@/Config/ApiUrl/system/user';

const Users = ({
  roleId,
  onChange = () => {
  }
}) => {

  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [userIds, setUserIds] = useState([]);

  const {loading} = useRequest(
    {...userAllList, data: {}},
    {
      onSuccess: (res) => {
        const userList = res || [];
        const ids = userList.filter(item => item.roleId && item.roleId.split(',').find(item => item === `${roleId}`)).map(item => item.userId);
        setUserIds(ids);
        setTargetKeys(ids);
        setMockData(userList.map(item => ({key: item.userId, title: `${item.name || ''}  ${item.phone || ''}`})));
      }
    }
  );

  const filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys) => {
    onChange({
      userIds,
      newTargetKeys
    });
    setTargetKeys(newTargetKeys);
  };

  if (loading) {
    return <Spin spinning/>;
  }

  return (
    <Transfer
      titles={['用户列表', '角色关联用户']}
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
export default Users;
