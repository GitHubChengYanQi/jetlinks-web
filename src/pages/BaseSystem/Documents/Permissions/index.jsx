import React, {useRef, useState} from 'react';
import {Button, Card, Table} from 'antd';
import {getSearchParams, useHistory} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import Breadcrumb from '@/components/Breadcrumb';
import {useRequest} from '@/util/Request';
import {roleList} from '@/Config/ApiUrl/system/role';
import Empty from '@/components/Empty';
import style from './index.module.less';
import Note from '@/components/Note';
import ModalMessage from '@/components/ModalMessage';
import {typeObject} from '@/pages/BaseSystem/Documents/Config';
import {columns} from '@/pages/BaseSystem/Documents/Permissions/components/PermissionsConfig/index,';

const addPermissions = {url: '/documentsPermissions/addList', method: 'POST'};

const getPermissions = {url: '/documentsPermissions/detail', method: 'GET'};

const getField = {url: '/permission/selectDict', method: 'GET'};

const Permissions = () => {

  const history = useHistory();

  const resultRef = useRef();

  const params = getSearchParams();

  const type = params.type;

  const [fields, setFields] = useState([]);

  const [roleData, setRoleData] = useState([]);

  const {loading: addFieldLoading, run: addField} = useRequest(addPermissions, {
    manual: true,
    onSuccess: () => {
      resultRef.current.success({
        title: '保存成功!',
        onCancel: () => {
          history.goBack();
        },
      });
    },
    onError: () => {
      resultRef.current.error({
        title: '保存失败!',
        onCancel: () => {
          history.goBack();
        },
      });
    }
  });

  // 获取字段
  const {loading: getFieldLoading, run: getFieldRun} = useRequest(getField, {
    manual: true,
    onSuccess: (res) => {
      if (!Array.isArray(res)) {
        return;
      }
      // 初始化字段权限配置，默认全部选中
      const initialization = res.map((item) => {
        return {
          filedName: item.label,
          name: item.value,
          roles: roleData.map((item) => {
            return {
              roleId: item.roleId,
              permissions: [{
                action: 'see',
                checked: true,
              }, {
                action: 'edit',
                checked: true,
              }]
            };
          })
        };
      });
      setFields(initialization);
    },
  });

  // 获取字段权限
  const {loading: fieldPermissionsLoading, run: fieldPermissionsRun} = useRequest(getPermissions, {
    manual: true,
    onSuccess: (res) => {
      if (res.length === 0) {
        // 如果没获取到字段权限，则获取单据字段
        getFieldRun({params: {receiptsEnum: type}});
        return;
      }
      // 初始化字段权限配置
      const initialization = res.map((item) => {
        const roles = item.operationResults || [];
        return {
          filedName: item.filedName,
          name: item.name,
          roles: roles.map((item) => {
            const permissions = item.canDos || [];
            return {
              roleId: item.roleId,
              permissions: permissions.map((item) => {
                return {
                  action: item.doName,
                  checked: item.isCan,
                };
              })
            };
          })
        };
      });
      setFields(initialization);
    },
  });

  // 获取角色列表
  const {loading: roleLoading} = useRequest(roleList, {
    onSuccess: (res) => {
      setRoleData(res);
      // 获取角色之后获取字段和权限
      fieldPermissionsRun({
        params: {formType: type}
      });
    }
  });

  // const data = [{name: '超级管理员'}, {name: '超级管理员'}];

  if (roleLoading || fieldPermissionsLoading || getFieldLoading) {
    return <ProSkeleton type="descriptions" />;
  }

  if (!roleData) {
    return <Empty />;
  }


  return <div style={{maxHeight: '100vh', overflow: 'auto'}}>

    <Card title={<Breadcrumb title="权限设置" />} bordered={false} />

    <div style={{textAlign: 'center'}}>
      <Table
        footer={() => {
          return <div style={{textAlign: 'right'}}>
            <Button loading={addFieldLoading} type="primary" onClick={() => {
              addField({
                data: {
                  params: fields.map((item) => {
                    const operationParams = item.roles || [];
                    return {
                      operationParams: operationParams.map((item) => {
                        const canDos = item.permissions || [];
                        return {
                          canDos: canDos.map((item) => {
                            return {
                              doName: item.action,
                              isCan: item.checked
                            };
                          }),
                          roleId: item.roleId,
                        };
                      }),
                      name: item.name,
                      filedName: item.name,
                    };
                  }),
                  formType: type,
                }
              });
            }}>保存</Button>
          </div>;
        }}
        title={() => {
          return <Card
            title={`设置${typeObject({type}).title}权限`}
            headStyle={{textAlign: 'left'}}
            bordered={false}
            bodyStyle={{padding: 0}}
          />;
        }}
        className={style.table}
        scroll={{x: 'max-content'}}
        sticky
        rowKey="name"
        pagination={false}
        dataSource={fields}
        columns={[{
          fixed: 'left',
          title: <div style={{width: 100}}>字段名</div>,
          dataIndex: 'name',
          align: 'center',
          render: (value) => {
            return <Note width={100}>{value}</Note>;
          }
        }, ...columns({roleData, fields, setFields})]}
      />

    </div>

    <ModalMessage ref={resultRef} />

  </div>;
};

export default Permissions;
