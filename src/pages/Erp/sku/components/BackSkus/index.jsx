import React from 'react';

const BackSkus = ({record, describe}) => {

  if (!record.spuResult) {
    return null;
  }

  if (describe) {
    return <>
      {
        record.backSkus
        &&
        record.backSkus[0]
        &&
        record.backSkus[0].attributeValues.attributeValues
        &&
        record.backSkus
        &&
        record.backSkus.map((items) => {
          return `${items.itemAttribute.attribute}:${items.attributeValues.attributeValues}`;
        }).join(' , ')
      }
    </>;
  }

  return <>
    {record.spuResult.name}
    &nbsp;/&nbsp;
    {record.skuName}
    {record.specifications && <> &nbsp;/&nbsp; {record.specifications}</>}
  </>;
};

export default BackSkus;
