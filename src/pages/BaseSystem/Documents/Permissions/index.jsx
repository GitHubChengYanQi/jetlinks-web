import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, Space} from 'antd';
import {getSearchParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import Breadcrumb from '@/components/Breadcrumb';
import {DocumentEnums} from '@/pages/BaseSystem/Documents/Enums';
import {useRequest} from '@/util/Request';
import {roleList} from '@/Config/ApiUrl/system/role';
import Empty from '@/components/Empty';
import style from './index.module.less';
import PermissionsConfig from '@/pages/BaseSystem/Documents/Permissions/components/PermissionsConfig/index,';

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

const Permissions = () => {

  const params = getSearchParams();

  const type = params.type;

  const {loading, data} = useRequest(roleList);

  const typeObject = () => {
    switch (type) {
      case DocumentEnums.purchaseAsk:
        return {
          title: '采购申请单',
        };
      case DocumentEnums.purchaseOrder:
        return {
          title: '采购单',
        };
      case DocumentEnums.instockOrder:
        return {
          title: '入库单',
        };
      case DocumentEnums.instockError:
        return {
          title: '入库异常'
        };
      case DocumentEnums.outstockOrder:
        return {
          title: '出库单',
        };
      case DocumentEnums.quality:
        return {
          title: '质检单',
        };
      default:
        return '';
    }
  };

  const [fields, setFields] = useState([]);

  console.log(fields);

  const fieldData = [{
    name: '名称',
    roles: [{
      roleId: 1,
      permissions: ['see', 'edit'],
    }],
  }, {
    name: '状态'
  }, {
    name: '创建时间'
  }, {
    name: '创建人'
  }, {
    name: '编号'
  }, {
    name: '备注'
  }];

  useEffect(() => {
    if (data) {
      const initialization = fieldData.map((item) => {
        const roles = item.roles || [];
        return {
          name: item.name,
          roles: data.map((item) => {
            return {
              roleId: item.roleId,
              permissions: ['see', 'edit'],
            };
          })
        };
      });
      setFields(initialization);
    }

  }, [data]);


  if (loading) {
    return <ProSkeleton type="descriptions" />;
  }

  if (!data) {
    return <Empty />;
  }


  return <>
    <Card title={<Breadcrumb title="权限设置" />} bordered={false} />

    <Card
      style={{width: 1250, margin: 'auto'}}
      title={`设置${typeObject().title}权限`}
      bordered={false}
      bodyStyle={{overflow: 'auto'}}
    >

      <Descriptions
        className={style.list}
        bordered
        labelStyle={labelStyle}
        contentStyle={{backgroundColor: 'rgb(235 232 232 / 22%)'}}
        column={data.length + 1}
      >

        <Descriptions.Item contentStyle={filedContentStyle}>字段名</Descriptions.Item>
        {
          data.map((item, idnex) => {
            return <Descriptions.Item key={idnex} contentStyle={filedContentStyle}>
              <Space direction="vertical" size={24} style={{width: '100%'}}>
                {item.name}
                <div style={{display: 'flex'}}>
                  <div style={{flexGrow: 1, textAlign: 'center'}}>
                    <Button type="link" onClick={() => {
                      const newFields = fields.map((fieldItem) => {
                        const roles = fieldItem.roles || [];
                        return {
                          ...fieldItem,
                          roles: roles.map(roleItem => {
                            if (roleItem.roleId === item.roleId) {
                              const permissions = roleItem.permissions || [];
                              return {
                                ...roleItem,
                                permissions:[...permissions,'see']
                              };
                            }
                            return roleItem;
                          })
                        };
                      });
                      setFields(newFields);
                    }}>查看</Button>
                  </div>
                  <div style={{flexGrow: 1, textAlign: 'center'}}>
                    <Button type="link" onClick={() => {
                      const newFields = fields.map((fieldItem) => {
                        const roles = fieldItem.roles || [];
                        return {
                          ...fieldItem,
                          roles: roles.map(roleItem => {
                            if (roleItem.roleId === item.roleId) {
                              const permissions = roleItem.permissions || [];
                              return {
                                ...roleItem,
                                permissions:[...permissions,'edit']
                              };
                            }
                            return roleItem;
                          })
                        };
                      });
                      setFields(newFields);
                    }}>编辑</Button>
                  </div>
                </div>
              </Space>

            </Descriptions.Item>;
          })
        }
      </Descriptions>

      {
        fields.map((item, index) => {
          return <PermissionsConfig
            key={index}
            roles={data}
            fieldItem={item}
            borderBottom={index !== (fields.length - 1)}
            onCheck={(check, action, roleId) => {
              const newFields = fields.map((fieldItem) => {
                const roles = fieldItem.roles || [];
                if (fieldItem.name === item.name) {
                  return {
                    ...fieldItem,
                    roles: roles.map(roleItem => {
                      if (roleItem.roleId === roleId) {
                        let permissions = roleItem.permissions || [];
                        if (check) {
                          permissions = permissions.filter(item => item !== action);
                        } else {
                          permissions.push(action);
                        }
                        return {
                          ...roleItem,
                          permissions
                        };
                      }
                      return roleItem;
                    })
                  };
                }
                return fieldItem;
              });
              setFields(newFields);
            }}
          />;
        })
      }
    </Card>

  </>;
};

export default Permissions;
