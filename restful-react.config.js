const camelcase = require('camelcase');
const STORYBOOK_BASE_URL = 'https://testpdkznotpbe.azurewebsites.net';
// const STORYBOOK_BASE_URL = process.env.STORYBOOK_BASE_URL;
const ROOT_PATH = './src/apis';

const API_LIST = [
  // 'Applications',
  'Area',
  // 'AuthorizationSettings',
  // 'Autocomplete',
  'CheckList',
  // 'CheckListItem',
  // 'ConfigurableComponent',
  // 'DataTable',
  // 'Form',
  // 'Note',
  // 'ReferenceList',
  // 'ScheduledJobExecution',
  // 'Session',
  // 'StoredFile',
  // 'TokenAuth',
  'User',
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
