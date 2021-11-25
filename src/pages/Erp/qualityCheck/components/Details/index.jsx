import React, {useEffect} from 'react';
import {Badge, Card, Descriptions, Image, Input, Table} from 'antd';
import {useRequest} from '@/util/Request';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {qualityTaskFormDetail} from '@/pages/Erp/qualityCheck/components/qualityTask/qualityTaskUrl';

const {Column} = Table;

const Details = ({qualityTaskId}) => {

  const {data,run} = useRequest(qualityTaskFormDetail, {manual: true});

  useEffect(()=>{
    if (qualityTaskId){
      run({
        data:{
          qualityTaskId,
        }
      });
    }
  },[]);

  const operator = (value) => {
    switch (value) {
      case 1:
        return <>=</>;
      case 2:
        return <>{'>='}</>;
      case 3:
        return <>{'<='}</>;
      case 4:
        return <>{'>'}</>;
      case 5:
        return <>{'<'}</>;
      case 6:
        return <>{'<>'}</>;
      default:
        break;
    }
  };

  const Type = (items) => {
    switch (items.type) {
      case 1:
        return <>{operator(items.field.operator)}  {items.field.standardValue}</>;
      case 2:
        return <>文本</>;
      case 3:
        return <>是否</>;
      case 4:
        return <>{operator(items.field.operator)}  {items.field.standardValue} % </>;
      case 5:
        return <>附件</>;
      default:
        return <Input disabled value="" />;
    }
  };

  const valueType = (items) => {
    switch (items.type) {
      case 1:
        return <>{items.value}</>;
      case 2:
        return <>{items.value}</>;
      case 3:
        return <>{items.value === '1' ? '合格' : '不合格'}</>;
      case 4:
        return <Image src={items.value}/>;
      case 5:
        return <>{items.value} % </>;
      case 6:
        return <Image src={items.value}/>;
      case 7:
        return <Image src={items.value}/>;
      default:
        return <Input disabled value="" />;
    }
  };

  return (
    <Card>
      <Table
        showTotal
        rowKey='dataId'
        pagination={false}
        expandable={{
          expandedRowRender: (record) =>{
            return <>
              {record.valueResults && record.valueResults.map((items,index)=>{
                return <div key={index}>
                  <Descriptions bordered column={4}>
                    <Descriptions.Item labelStyle={{width:100}} contentStyle={{width:150,backgroundColor:'#fff'}} label="质检项"> {items.name}</Descriptions.Item>
                    <Descriptions.Item labelStyle={{width:100}} contentStyle={{width:150,backgroundColor:'#fff'}} label="标准值">{Type(items)}</Descriptions.Item>
                    <Descriptions.Item labelStyle={{width:100}} contentStyle={{width:150,backgroundColor:'#fff'}} label="验收值">{valueType(items)}</Descriptions.Item>
                    <Descriptions.Item labelStyle={{width:100}} contentStyle={{width:50,backgroundColor:'#fff'}} label="结果">{items.standar ? <CheckCircleOutlined style={{color:'green'}} /> : <CloseCircleOutlined  style={{color:'red'}} />}</Descriptions.Item>
                  </Descriptions>
                </div>;
              })}
            </>;
          } ,
        }}
        dataSource={data || []}
      >
        <Column title="物料" dataIndex="skuId" render={(value,record)=>{
          return (
            <>
              {record.sku && record.sku.skuName}
              &nbsp;/&nbsp;
              {record.sku && record.sku.spuResult && record.sku.spuResult.name}
              &nbsp;&nbsp;
              <em style={{color: '#c9c8c8', fontSize: 10}}>
                (
                {
                  record.sku
                  &&
                  record.sku.skuJsons
                  &&
                  record.sku.skuJsons.map((items, index) => {
                    return (
                      <span key={index}>{items.attribute.attribute}：{items.values.attributeValues}</span>
                    );
                  })
                }
                )
              </em>
            </>
          );
        }} />
        <Column title="供应商 / 品牌" dataIndex="brandId" render={(value,record)=>{
          return (
            <>
              {record.brand && record.brand.brandName}
            </>
          );
        }} />
        <Column title='数量' dataIndex='number' render={(value,record)=>{
          return <>{record.inkind && record.inkind.number}</>;
        }} />
        <Column title="质检结果" dataIndex="state" render={(value,record)=>{
          const standar = record.valueResults && record.valueResults.filter((value)=>{
            return value.standar === false;
          });
          return (standar && standar.length > 0) ? <Badge text="不合格" color="red" /> : <Badge text="合格" color="green" />;
        }} />
      </Table>
    </Card>
  );
};

export default Details;
