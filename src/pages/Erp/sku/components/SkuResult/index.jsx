import React from 'react';

const SkuResult = ({skuResult, describe}) => {

  if (!(skuResult && skuResult.spuResult)) {
    return null;
  }


  if (describe) {
    return <>
      {
        skuResult.list
        &&
        skuResult.list.length > 0
        &&
        skuResult.list[0].attributeValues
        &&
        skuResult.list.map((items) => {
          return `${items.itemAttributeResult.attribute}:${items.attributeValues}`;
        }).join(' , ')
      }
    </>;
  }

  return <>
    {skuResult.spuResult.name}
    &nbsp;/&nbsp;
    {skuResult.skuName}
    {skuResult.specifications && <> &nbsp;/&nbsp; {skuResult.specifications}</>}
  </>;
};

export default SkuResult;
