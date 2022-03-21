import React from 'react';

const SkuResultSkuJsons = ({skuResult, describe}) => {

  if (!(skuResult && skuResult.spuResult)) {
    return <></>;
  }

  if (describe) {
    return skuResult.skuJsons
      &&
      skuResult.skuJsons.length > 0
      &&
      skuResult.skuJsons[0].values.attributeValues
      &&
      skuResult.skuJsons.map((items) => {
        return `${items.attribute.attribute}:${items.values.attributeValues}`;
      }).join(' , ') || '无';
  }


  return <>
    {skuResult.spuResult.name}
    &nbsp;/&nbsp;
    {skuResult.skuName}
    {skuResult.specifications && <> &nbsp;/&nbsp; {skuResult.specifications}</>}
  </>;
};

export default SkuResultSkuJsons;
