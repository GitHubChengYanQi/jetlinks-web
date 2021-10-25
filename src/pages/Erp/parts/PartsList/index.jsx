/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useEffect, useRef} from 'react';
import {Button, Card, Descriptions, Divider, notification, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import {useHistory, useParams} from 'ice';
import {partsAdd, partsDelete, partsDetail, partsEdit, partsList} from '../PartsUrl';
import {useRequest} from '@/util/Request';
import {InternalFieldList as FieldList} from '@formily/antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import SpuList from '@/pages/Erp/parts/components/SpuList';
import ProSkeleton from '@ant-design/pro-skeleton';
import {useBoolean} from 'ahooks';


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

  const [add, {setTrue, setFalse}] = useBoolean();

  const openNotificationWithIcon = type => {
    notification[type]({
      message: type === 'success' ? '保存成功！' : '删除成功！',
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
      <Descriptions column={1} bordered labelStyle={{width: 170, textAlign: 'right', backgroundColor: '#fff'}}>
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
              setFalse();
              openNotificationWithIcon('success');
            }}
          >
            <FieldList
              name="parts"
              initialValue={parts.length > 0 ? parts : [{}]}
            >
              {({state, mutators}) => {
                const onAdd = () => {
                  setTrue();
                  mutators.push();
                };
                return (
                  <div>
                    {state.value.map((item, index) => {
                      const onRemove = index => mutators.remove(index);
                      return (
                        <RowStyleLayout key={index}>

                          <SpuList index={index} />

                          <Button
                            type="link"
                            style={{float: 'right'}}
                            icon={<DeleteOutlined />}
                            onClick={() => {
                              setTrue();
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
                      hidden={!add}
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

        <Descriptions.Item label="重要程度" width={120}>{data.important || '--'}</Descriptions.Item>
        <Descriptions.Item label="产品重量" width={120}>{data.weight || '--'}</Descriptions.Item>
        <Descriptions.Item label="材质" width={150}>{ data.material ? data.material.name : '--'}</Descriptions.Item>
        <Descriptions.Item label="成本">{data.cost || '--'}</Descriptions.Item>
        <Descriptions.Item label="易损">{data.vulnerability === 0 ? '易损' : '不易损'}</Descriptions.Item>

        <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
        <Descriptions.Item label="更新时间">{parts && parts[0] ? parts[0].createTime : '--'}</Descriptions.Item>

        <Descriptions.Item
          label="更新用户">{parts && parts[0] ? (parts[0].userResult && parts[0].userResult.name) : '--'}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PartsList;
