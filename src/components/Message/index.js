import {Message as AfdMessage} from '@alifd/next';

const defaultConfig = {
  title: '提示',
  hasMask: true,
  closeable: true,
  duration: 0
};

const success = (config) => {
  const content = typeof config === 'object' ? config : {content: config};
  AfdMessage.success({
    ...defaultConfig,
    title: '操作成功',
    ...content,
  });
};
const warning = (config) => {
  const content = typeof config === 'object' ? config : {content: config};
  AfdMessage.warning({
    ...defaultConfig,
    title: '警告：',
    ...content,
  });
}
const error = (config) => {
  const content = typeof config === 'object' ? config : {content: config};
  AfdMessage.error({
    ...defaultConfig,
    title: '错误',
    ...content,
    content: content.content || '未知错误，请联系管理员。'
  });
}
const notice = (config) => {
  const content = typeof config === 'object' ? config : {content: config};
  AfdMessage.notice({
    ...defaultConfig,
    title: '日志：',
    ...content,
  });
}
const help = (config) => {
  const content = typeof config === 'object' ? config : {content: config};
  AfdMessage.help({
    ...defaultConfig,
    title: '帮助：',
    ...content,
  });
}
const loading = (config) => {
  const content = typeof config === 'object' ? config : {content: config};
  AfdMessage.loading({
    ...defaultConfig,
    title: '载入中：',
    ...content,
  });
}

const Message = {
  success,
  warning,
  error,
  notice,
  help,
  loading
};
export default Message;