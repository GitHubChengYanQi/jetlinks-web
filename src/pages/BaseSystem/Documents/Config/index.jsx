import {DocumentEnums} from '@/pages/BaseSystem/Documents/Enums';


export const typeObject = ({type, status = []}) => {

  const disabled = (value) => {
    return status.filter((item) => {
      return item.actions.filter(item => item.value === value).length > 0;
    }).length > 0;
  };

  switch (type) {
    case DocumentEnums.purchaseAsk:
      return {
        title: '采购申请单',
        types: [
          {label: '执行申请', value: 'perform', disabled: disabled('perform')},
        ]
      };
    case DocumentEnums.purchaseOrder:
      return {
        title: '采购单',
      };
    case DocumentEnums.instockOrder:
      return {
        title: '入库单',
        types: [
          // {label: '核实数量', value: 'verify', disabled: disabled('verify')},
          {label: '执行入库', value: 'performInstock', disabled: disabled('performInstock')},
        ],
      };
    case DocumentEnums.instockError:
      return {
        title: '异常单',
        types: [
          {label: '核实', value: 'verify', disabled: disabled('verify')},
        ]
      };
    case DocumentEnums.outstockOrder:
      return {
        title: '出库单',
        types: [
          {label: '出库', value: 'outStock', disabled: disabled('outStock')},
        ]
      };
    case DocumentEnums.stocktaking:
      return {
        title: '盘点单',
        types: [
          {label: '盘点', value: 'check', disabled: disabled('check')},
        ]
      };
    case DocumentEnums.maintenance:
      return {
        title: '养护单',
        types: [
          {label: '开始养护', value: 'maintenanceing', disabled: disabled('maintenanceing')},
        ]
      };
    case DocumentEnums.quality:
      return {
        title: '质检单',
        types: [
          {label: '分派', value: '1', disabled: disabled('1')},
          {label: '执行质检', value: '2', disabled: disabled('2')},
          {label: '质检入库', value: '3', disabled: disabled('3')},
        ]
      };
    case DocumentEnums.allocation:
      return {
        title: '调拨单',
        types: [
          {label: '分派', value: 'assign', disabled: disabled('assign')},
          {label: '执行', value: 'carryAllocation', disabled: disabled('carryAllocation')},
        ]
      };
    default:
      return {
        title: '质检单',
        types: []
      };
  }
};