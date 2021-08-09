/**
 * 产品表列表页
 *
 * @author
 * @Date 2021-07-14 14:04:26
 */

import React, {useRef, useState} from 'react';
import {Button, Modal, Table as AntTable} from 'antd';
import ItemsList from "@/pages/Erp/items/ItemsList";
import useRequest from "../../../../../../util/Request/useRequest";

const ItemsTable = (props) => {

  const ref = useRef(null);
  const [data, setData] = useState(null);
  const {da,run} = useRequest({url: '/erpPackageTable/add',method: 'POST'},{manual:true});
  return (
    <>
      <ItemsList onChange={(value)=>{
        setData(value);}}/>
      <div style={{textAlign:'center'}}>
        <Button type="primary"
          onClick={()=> {
            if(data){
              run(
                {
                  data:{
                    packageId: props.packageId,
                    itemId: data[0],
                    salePrice: 0,
                    totalPrice: 0,
                    quantity: 0
                  }
                }
              );

            }
            props.onSuccess();
          }}>
          选择
        </Button>
        <Button onClick={()=> {
          props.onSuccess();
        }}>
          返回
        </Button>
      </div>
    </>
  );
};

export default ItemsTable;
