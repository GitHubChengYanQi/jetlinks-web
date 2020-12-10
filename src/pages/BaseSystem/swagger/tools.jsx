export const getDefinitionModel = (schema, apiData) => {
  if (!schema) return ['',''];
  const {type} = schema;
  // 获取数组类型的响应
  if (type && type === 'array') {
    if (schema.items) {
      const $ref = schema.items.$ref;
      const modelPath = splitPath($ref);
      return resovleDefinitions(modelPath);
    }
  }
  if (!type && schema.$ref) {
    return resovleDefinitions(splitPath(schema.$ref));
  }

  function splitPath($ref) {
    return $ref.replace('#/definitions/', '').split('/');
  }

  function resovleDefinitions(modelPath) {
    let index = 0;
    let models = apiData.definitions || {};
    while (index < modelPath.length) {
      models = models[modelPath[index]];
      index++;
    }

    return [modelPath, models];
  }
};
