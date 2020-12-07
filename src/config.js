export default {
  default: {
    logLevel: 'info',
    component: 'ant',
    baseURI: 'http://localhost'
  },
  home: {
    logLevel: 'info',
    component: 'ant',
    baseURI: 'http://127.0.0.1:8081'
  },
  production: {
    logLevel: 'error'
  }
};
