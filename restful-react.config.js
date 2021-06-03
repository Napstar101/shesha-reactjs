const camelCase = require('camel-case');
const BASE_URL = 'http://localhost:21021';
const ROOT_PATH = './src/apis';

const API_LIST = [
  // SHESHA
  'Note',
  'StoredFile',
  'DataTable',
];

function generateFetcher() {
  let apiObj = {};

  API_LIST.forEach(key => {
    const camelCasedName = camelCase(key);
    apiObj[`${camelCasedName}Api`] = {
      output: `${ROOT_PATH}/${camelCasedName}.tsx`,
      url: `${BASE_URL}/swagger/service:${key}/swagger.json`,
    };
  });

  return apiObj;
}

module.exports = {
  ...generateFetcher(),
};
