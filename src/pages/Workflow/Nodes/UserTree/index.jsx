import React, {useState} from 'react';
import {Button, Space, Tree} from 'antd';
import {useRequest} from '@/util/Request';
import {UserIdSelect} from '@/pages/Erp/instock/InstockUrl';

const UserTree = ({value, onChange}) => {

  const {loading,data} = useRequest(UserIdSelect);

  const [check, setCheck] = useState(value || []);

  const treeData = data && data.map((item) => {
    return {
      title: item.label,
      key: item.value,
    };
  });

  if (loading){
    return null;
  }

  return <>
    <Tree
      checkable
      defaultExpandAll
      checkedKeys={check.map((items,index)=>{
        return items.key;
      })}
      onCheck={(value, option) => {
        setCheck(option.checkedNodes);
      }}
      treeData={[{title: '全选', key: 0, children: treeData || []}]}
    />
    <div style={{margin: 16, textAlign: 'center'}}>
      <Space>
        <Button type="primary" onClick={()=>{
          typeof onChange === 'function' && onChange(check);
        }}>确定</Button>
        <Button type="default" onClick={()=>{

        }}>清空</Button>
      </Space>
    </div>
  </>;
};

export default UserTree;
