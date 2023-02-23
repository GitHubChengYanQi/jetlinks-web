import React, {useEffect} from 'react';
import {Button, Table as AntTable, Tabs} from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import {useHistory} from 'ice';
import Render from '@/components/Render';
import style from '@/components/Table/index.module.less';
import {useRequest} from '@/util/Request';
import {contactFindAllByGroup} from '@/pages/alarm/AlarmProject/url';
import {isArray} from '@/util/Tools';

const ContactList = (
  {
    groupIds,
    show
  }
) => {

  const history = useHistory();

  const {loading, data, run} = useRequest(contactFindAllByGroup, {manual: true});

  const columns = [
    {title: '姓名', dataIndex: 'name', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {
      title: '职务',
      dataIndex: 'job',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {title: '手机号码', dataIndex: 'phone', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {title: '电子邮箱', dataIndex: 'mail', align: 'center', render: (text) => <Render text={text}/>}
  ];

  useEffect(() => {
    run({data: {groupIds}});
  }, []);

  if (loading) {
    return <ProSkeleton type="descriptions"/>;
  }

  return <>
    {
      isArray(data).map((item, index) => {
        return <div key={index}>
          <Tabs
            tabBarExtraContent={index === 0 && <Button
              hidden={show}
              type="primary"
              onClick={() => history.push('/alarm/contactGroup')}
            >
              添加联系人组
            </Button>}
            items={[{key: '1', label: '联系人组'}]}
          />
          <AntTable
            onHeaderRow={() => {
              return {
                className: style.headerRow
              };
            }}
            columns={columns}
            dataSource={[{}, {}, {}]}
          />
        </div>;
      })
    }

  </>;
};

export default ContactList;
