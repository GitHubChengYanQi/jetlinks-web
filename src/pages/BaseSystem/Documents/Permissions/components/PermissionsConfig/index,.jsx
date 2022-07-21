import {Button, Checkbox} from 'antd';
import React from 'react';
import style from '@/pages/BaseSystem/Documents/Permissions/index.module.less';

export const columns = ({
  roleData,
  fields,
  setFields = () => {
  }
}) => {

  const getChecked = (permission, action) => {
    const actionpermission = permission.filter(item => item.action === action)[0] || {};
    return actionpermission.checked;
  };

  const onCheck = (item, checked, action, roleId) => {
    const newFields = fields.map((fieldItem) => {
      const roles = fieldItem.roles || [];
      if (fieldItem.name === item.name) {
        return {
          ...fieldItem,
          roles: roles.map(roleItem => {
            if (roleItem.roleId === roleId) {
              const permissions = roleItem.permissions || [];
              return {
                ...roleItem,
                permissions: permissions.map(item => {
                  if (item.action === action) {
                    return {action, checked};
                  }
                  return item;
                })
              };
            }
            return roleItem;
          })
        };
      }
      return fieldItem;
    });
    setFields(newFields);
  };

  const checkAll = (roleItem, action) => {
    const checkeds = [];
    fields.map((item) => {
      const roles = item.roles || [];
      return roles.map((fidleRoleItem) => {
        const permissions = fidleRoleItem.permissions || [];
        const actionpermission = permissions.filter(item => item.action === action)[0] || {};
        if ((fidleRoleItem.roleId === roleItem.roleId) && actionpermission.checked) {
          checkeds.push(fidleRoleItem);
        }
        return null;
      });
    });

    const newFields = fields.map((fieldItem) => {
      const roles = fieldItem.roles || [];
      return {
        ...fieldItem,
        roles: roles.map(fieldRoleItem => {
          if (fieldRoleItem.roleId === roleItem.roleId) {
            const permissions = fieldRoleItem.permissions || [];
            return {
              ...fieldRoleItem,
              permissions: permissions.map(item => {
                if (item.action === action) {
                  return {action, checked: checkeds.length !== fields.length};
                }
                return item;
              })
            };
          }
          return fieldRoleItem;
        })
      };
    });
    setFields(newFields);
  };

  return roleData ? roleData.map((item) => {
    return {
      title: <div style={{textAlign: 'center', width: 200}}>
        {item.name}
        <div style={{display: 'flex', marginTop: 8}}>
          <div className={style.action}>
            <Button type="link" onClick={() => {
              checkAll(item, 'see');
            }}>查看</Button>
          </div>
          <div className={style.action}>
            <Button type="link" onClick={() => {
              checkAll(item, 'edit');
            }}>编辑</Button>
          </div>
        </div>
      </div>,
      align: 'center',
      dataIndex: 'actions',
      render: (value, record) => {
        const fieldRoles = record.roles || [];

        const role = fieldRoles.filter(roleItem => roleItem.roleId === item.roleId)[0] || {};

        const permission = role.permissions || [];

        return <div style={{display: 'flex', width: 200}}>
          <div
            className={style.action}
            onClick={() => {
              onCheck(record, !getChecked(permission, 'see'), 'see', item.roleId);
            }}>
            <Checkbox
              checked={getChecked(permission, 'see')}
            />
          </div>
          <div
            className={style.action}
            onClick={() => {
              onCheck(record, !getChecked(permission, 'edit'), 'edit', item.roleId);
            }}>
            <Checkbox
              checked={getChecked(permission, 'edit')}
            />
          </div>
        </div>;
      }
    };
  }) : [];
};
