// 添加节点类型
export const OptionTypes = {
  APPROVER: 1,
  NOTIFIER: 2,
  BRANCH: 3,
  CONDITION: 4
};
export const NodeTypes = {...OptionTypes, START: 0};
// 节点类型默认标题名
export const OptionNames = {
  [OptionTypes.APPROVER]: '过程',
  [OptionTypes.NOTIFIER]: '抄送',
  [OptionTypes.CONDITION]: '分支'
};
// 节点模板
export const NodeTemplates = {
  [OptionTypes.APPROVER]: {
    'nodeName': '过程',
    // 'error': true,
    'type': OptionTypes.APPROVER,
    // 'settype': 1,
    // 'selectMode': 0,
    // 'selectRange': 0,
    // 'directorLevel': 1,
    // 'replaceByUp': 0,
    // 'examineMode': 1,
    // 'noHanderAction': 1,
    // 'examineEndDirectorLevel': 0,
    // 'nodeUserList': []
  },
  [OptionTypes.NOTIFIER]: {
    'nodeName': '抄送人',
    'type': OptionTypes.NOTIFIER,
    // 'ccSelfSelectFlag': 1,
    // 'nodeUserList': []
  },
  [OptionTypes.CONDITION]: {
    'nodeName': '路由',
    'auditType':'luYou',
    'type': OptionTypes.CONDITION,
    'childNode': null,
    // 'conditionNodeList': []
  },
  [OptionTypes.BRANCH]: {
    'nodeName': '条件',
    'type': OptionTypes.BRANCH,
    'priorityLevel': 2,
    // 'conditionList': [],
    // 'nodeUserList': [],
    'childNode': null
  }
};

