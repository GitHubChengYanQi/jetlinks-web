/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useEffect, useRef} from 'react';
import Table from '@/components/Table';
import {Button, Card, Descriptions, Divider, notification, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import {useHistory, useParams} from 'ice';
import {partsAdd, partsDelete, partsDetail, partsEdit, partsList} from '../PartsUrl';
import PartsEdit from '../PartsEdit';
import {useRequest} from '@/util/Request';
import * as SysField from '../PartsField';
import ProCard from '@ant-design/pro-card';
import {InternalFieldList as FieldList} from '@formily/antd';
import Title from '@/components/Title';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import SpuList from '@/pages/Erp/parts/components/SpuList';
import ProSkeleton from '@ant-design/pro-skeleton';


const {Column} = AntTable;


const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    min-width: 300px;
  }
`;

const ApiConfig = {
  view: partsDetail,
  add: partsAdd,
  save: partsEdit
};

const PartsList = (props) => {

  const params = useParams();

  const ref = useRef();

  const openNotificationWithIcon = type => {
    notification[type]({
      message: '保存成功！',
    });
  };


  const {loading, data} = useRequest(spuDetail, {
    defaultParams: {
      data: {
        spuId: params.cid
      }
    }
  });

  const {loading: partsLoading, data: parts} = useRequest(partsList, {
    defaultParams: {
      data: {
        pid: params.cid
      }
    }
  });

  if (loading || partsLoading) {
    return (<ProSkeleton type="descriptions" />);
  }

  if (!data) {
    return null;
  }

  const Type = () => {
    switch (data.productionType) {
      case 0:
        return '自制件';
      case 1:
        return '委派件';
      case 2:
        return '外购件';
      default:
        break;
    }
  };

  return (
    <Card title="物料清单">
      <Descriptions column={1} bordered labelStyle={{minWidth: 170, textAlign: 'right', backgroundColor: '#fff'}}>
        <Descriptions.Item label="成品物料编号/名称">{data.name}</Descriptions.Item>
        <Descriptions.Item label="类目">{data.category ? data.category.categoryName : '--'}</Descriptions.Item>
        <Descriptions.Item label="单位"> {data.unitResult ? data.unitResult.unitName : '--'}</Descriptions.Item>
        <Descriptions.Item label="生产类型">{Type()}</Descriptions.Item>
        <Descriptions.Item label="物料清单">
          <Form
            ref={ref}
            value={false}
            api={ApiConfig}
            fieldKey="partsId"
            NoButton={false}
            onSubmit={(value) => {
              value = {
                ...value,
                pid: params.cid
              };
              return value;
            }}
            onSuccess={() => {
              openNotificationWithIcon('success');
            }}
          >
            <FieldList
              name="parts"
              initialValue={parts.length > 0 ? parts : [{}]}
            >
              {({state, mutators}) => {
                const onAdd = () => mutators.push();
                return (
                  <div>
                    {state.value.map((item, index) => {
                      const onRemove = index => mutators.remove(index);
                      return (
                        <RowStyleLayout key={index}>

                          <SpuList index={index} />

                          <Button
                            type="link"
                            style={{float: 'right', display: state.value.length === 1 && 'none'}}
                            icon={<DeleteOutlined />}
                            onClick={() => {
                              onRemove(index);
                            }}
                            danger
                          />
                        </RowStyleLayout>
                      );
                    })}
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={onAdd}>增加物料</Button>
                    <Button
                      type="primary"
                      style={{marginLeft: 8}}
                      onClick={() => {
                        ref.current.submit();
                      }}
                    >保存</Button>
                  </div>
                );
              }}
            </FieldList>
          </Form>
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
        <Descriptions.Item label="更新时间">{parts && parts[0] ? parts[0].createTime : '--'}</Descriptions.Item>
        <Descriptions.Item
          label="更新用户">{parts && parts[0] ? (parts[0].userResult && parts[0].userResult.name) : '--'}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PartsList;
