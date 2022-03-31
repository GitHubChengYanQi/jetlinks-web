import React, {useImperativeHandle, useRef, useState} from 'react';
import {Button, Space, Spin} from 'antd';
import {PlusOutlined, MenuOutlined, VerticalAlignTopOutlined} from '@ant-design/icons';
import {useBoolean} from 'ahooks';
import AddSpu from '@/pages/Order/CreateOrder/components/AddSpu';
import Modal from '@/components/Modal';
import {useRequest} from '@/util/Request';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import {Sortable} from '@/components/Table/components/DndKit/Sortable';
import {Handle} from '@/components/Table/components/DndKit/Item';
import Note from '@/components/Note';
import InputNumber from '@/components/InputNumber';

const SkuList = ({...props}, ref) => {

  const addSku = useRef();

  const [refresh, {toggle}] = useBoolean();

  const [skuId, setSkuId] = useState();

  const [skuList, setSkuList] = useState([]);

  useImperativeHandle(ref, () => ({
    skuList
  }));

  const {loading: skuLoading, run: skuRun} = useRequest(skuDetail, {
    manual: true,
    onSuccess: (res) => {
      setSkuList(
        [...skuList, {
          skuId: res.skuId,
          skuResult: res,
          num: 1,
          fixed: false,
        }]
      );
      toggle();
    }
  });

  const setSku = (data, index) => {
    const array = skuList.filter(() => true);
    array[index] = {...array[index], ...data};
    toggle();
    setSkuList(array);
  };

  const Item = (props) => {
    const {value, item, index, ...other} = props;
    return <Space>
      <Handle icon={<MenuOutlined/>} {...other} />
      <Note width={200}>{value}</Note>
      <InputNumber
        value={skuList[index].num}
        style={{border: 'solid 1px #eee', width: 40}}
        onBlur={(value) => {
          setSku({num: value}, index);
        }}
      />
      <Button type='text' onClick={() => {
        setSku({fixed: !skuList[index].fixed}, index);
      }}>
        <VerticalAlignTopOutlined style={{color: skuList[index].fixed ? '#d79418' : '#b3b3b3', fontSize: 24}}/>
      </Button>
    </Space>;
  };

  return <>
    <Sortable
      handle
      liBorder
      DefinedItem={Item}
      refresh={refresh}
      items={skuList.map((item) => {
        return {
          ...item,
          key: item.skuId,
          title: <SkuResultSkuJsons skuResult={item.skuResult}/>,
        };
      })}
      onDragEnd={(allIems) => {
        const newSkuList = allIems.map((item, index) => {
          const sku = skuList.filter((skuItem) => {
            return skuItem.skuId === item.skuId;
          });
          return {
            ...item,
            fixed: sku[0].fixed || item.skuId !== skuList[index].skuId
          };
        });
        setSkuList(newSkuList);
      }}
    />

    <div style={{padding: '0 16px 16px 16px'}}>
      {
        skuLoading
          ?
          <Spin/>
          :
          <Button
            style={{width: '100%'}}
            onClick={() => {
              addSku.current.open(false);
            }}><PlusOutlined/></Button>
      }
    </div>


    <Modal
      headTitle="物料选择"
      ref={addSku}
      onClose={() => {
        setSkuId(null);
      }}
      width={800}
      footer={<Space>
        <Button onClick={() => {
          setSkuId(null);
          addSku.current.close();
        }}>取消</Button>
        <Button type="primary" disabled={!skuId} onClick={() => {
          skuRun({
            data: {
              skuId
            }
          });
          addSku.current.close();
          setSkuId(null);
        }}>确定</Button>
      </Space>}
    >
      <AddSpu onChange={setSkuId} value={skuId} noSkuIds={skuList.map((item) => item.skuId)}/>
    </Modal>
  </>;
};

export default React.forwardRef(SkuList);
