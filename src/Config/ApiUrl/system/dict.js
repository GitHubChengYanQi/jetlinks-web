export const dictTypeList = {
  url: '/rest/dictType/list',
  method: 'POST',
  rowKey: 'dictTypeId'
};

export const dictTypeDetail = {
  url: '/rest/dictType/detail',
  method: 'GET',
  rowKey: 'dictTypeId'
};

export const dictTypeSelect = {
  url: '/rest/dictType/select',
  method: 'POST',
  rowKey:'dictId'
};

export const dictByCode = {
  url: '/rest/dict/listDictsByCode',
  method: 'POST',
};
export const dictRadioByCode = {
  url: '/rest/dict/radioDictsByCode',
  method: 'POST',
};

export const dictList = {
  url: '/rest/dict/list',
  method: 'POST',
  rowKey:'dictId'
};

export const dictDetail = {
  url: '/rest/dict/detail',
  method: 'POST',
  rowKey:'dictId'
};

export const dictSave = {
  url: '/rest/dict/editItem',
  method: 'POST',
  rowKey:'dictId'
};
export const dictAdd = {
  url: '/rest/dict/addItem',
  method: 'POST',
  rowKey:'dictId'
};

