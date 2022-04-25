import React from 'react';
import {config} from 'ice';
import {useRequest} from '@/util/Request';
import Import from '@/pages/Erp/sku/SkuTable/Import';

const {baseURI} = config;


const SkuImport = ({
  tableRef,
  addRef
}) => {


  const {run} = useRequest({url: '/sku/batchAdd', method: 'Post'}, {manual: true});

  return <div>
    <Import
      checkbox
      url={`${baseURI}Excel/importSku`}
      title="导入物料"
      module="sku"
      onOk={() => {
        tableRef.current.submit();
      }}
      templateUrl={`${baseURI}api/SkuExcel`}
      onMerge={(data) => {
        const skuData = data.simpleResult || {};

        const describe = [];
        data.describe.split(',').map((item) => {
          return describe.push({
            label: item.split(':')[0],
            value: item.split(':')[1],
          });
        });

        skuData.list.map((item) => {
          return describe.push({
            label: item.itemAttributeResult && item.itemAttributeResult.attribute,
            value: item.attributeValues,
          });
        });

        addRef.current.open({
          ...skuData,
          newCoding: data.standard,
          merge: true,
          defaultValue: {
            sku: describe
          }
        });
      }}
      onNext={(data) => {
        run({data: {skuParams: data}});
      }}
      onAdd={(data) => {
        addRef.current.open({
          defaultValue: {
            standard: data.standard,
            spu: {name: data.classItem},
            skuName: data.skuName,
            batch: data.isNotBatch === '是' ? 1 : 0,
            specifications: data.specifications,
            sku: data.describe.split(',').map((item) => {
              return {
                label: item.split(':')[0],
                value: item.split(':')[1],
              };
            }),
          }
        });
      }}
    />
  </div>;
};

export default SkuImport;
