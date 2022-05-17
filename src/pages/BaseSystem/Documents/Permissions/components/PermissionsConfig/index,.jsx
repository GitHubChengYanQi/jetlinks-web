import React from 'react';
import {Checkbox, Descriptions} from 'antd';
import style from '@/pages/BaseSystem/Documents/Permissions/index.module.less';

const labelStyle = {
  display: 'none'
};

const contentStyle = {
  width: '40%',
  textAlign: 'center'
};

const filedContentStyle = {
  ...contentStyle,
  width: '20%'
};

const PermissionsConfig = ({
  roles = [],
  fieldItem = {},
  borderBottom,
  onCheck = () => {
  }
}) => {

  const fieldRoles = fieldItem.roles || [];


  return <Descriptions
    className={borderBottom && style.list}
    bordered
    labelStyle={labelStyle}
    column={roles.length + 1}
  >
    <Descriptions.Item contentStyle={filedContentStyle}>
      {fieldItem.name}
    </Descriptions.Item>
    {
      roles.map((item, index) => {

        const role = fieldRoles.filter(roleItem => roleItem.roleId === item.roleId)[0] || {};

        const permission = role.permissions || [];
        return <Descriptions.Item key={index}>
          <div style={{display: 'flex'}}>
            <div
              style={{flexGrow: 1, textAlign: 'center', cursor: 'pointer'}}
              onClick={() => {
                onCheck(permission.includes('see'), 'see', item.roleId);
              }}>
              <Checkbox
                checked={permission.includes('see')}
              />
            </div>
            <div
              style={{flexGrow: 1, textAlign: 'center', cursor: 'pointer'}}
              onClick={() => {
                onCheck(permission.includes('edit'), 'edit', item.roleId);
              }}>
              <Checkbox
                checked={permission.includes('edit')}
              />
            </div>
          </div>
        </Descriptions.Item>;
      })
    }
  </Descriptions>;
};

export default PermissionsConfig;
