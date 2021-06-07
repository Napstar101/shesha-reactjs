const camelcase = require('camelcase');
const STORYBOOK_BASE_URL = process.env.STORYBOOK_BASE_URL;
const ROOT_PATH = './src/apis';

const API_LIST = [
  // SHESHA
  'Note',
  'StoredFile',
  'DataTable',
  'Form',
  'ConfigurableComponent'
];

function generateFetcher() {
  let apiObj = {};

  API_LIST.forEach(key => {
    const camelCasedName = camelcase(key);
    apiObj[`${camelCasedName}Api`] = {
      output: `${ROOT_PATH}/${camelCasedName}.tsx`,
      url: `${STORYBOOK_BASE_URL}/swagger/service:${key}/swagger.json`,
    };
  });

  return apiObj;
}

module.exports = {
  ...generateFetcher(),
};
