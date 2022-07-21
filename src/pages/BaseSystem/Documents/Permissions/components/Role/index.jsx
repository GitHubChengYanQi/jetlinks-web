import React, {useRef, useState} from 'react';
import {Button, Space} from 'antd';
import Tree from '@/components/Tree';
import {roleTreeList} from '@/Config/ApiUrl/system/role';
import Drawer from '@/components/Drawer';
import Note from '@/components/Note';

const Role = ({value, onChange}) => {

  const [roles, setRoles] = useState([]);
  console.log(roles);

  const roRef = useRef();

  return <>
    <Button type="link" onClick={() => {
      roRef.current.open(false);
    }}>
      {roles.length > 0 ? roles.map(item => item.title).join(',') : '设置查看权限'}
    </Button>

    <Drawer headTitle="设置字段权限" ref={roRef}>
      <div>
        <Tree
          value={roles.map(item => item.key)}
          api={roleTreeList}
          onChange={(values, nodes) => {
            setRoles(nodes);
          }} />
      </div>
    </Drawer>

  </>;
};

export default Role;
