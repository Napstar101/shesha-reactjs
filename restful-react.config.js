const camelcase = require('camelcase');

const STORYBOOK_BASE_URL = 'https://testpdkznotpbe.azurewebsites.net';
// const STORYBOOK_BASE_URL = process.env.STORYBOOK_BASE_URL;
const ROOT_PATH = './src/apis';

const API_LIST = [
  'Applications',
  'Area',
  'AuthorizationSettings',
  'Autocomplete',
  'CheckList',
  'CheckListItem',
  'ConfigurableComponent',
  'DataTable',
  'Form',
  'Note',
  'Person',
  'ReferenceList',
  'ScheduledJobExecution',
  'Session',
  'StoredFile',
  'TokenAuth',
  'User',
];

const defaultConfiguration = {
  customImport: `import * as RestfulShesha from "../utils/fetchers"`,
  customGenerator: ({ componentName, verb, route, description, genericsTypes, paramsInPath, paramsTypes }) => {
    const propsType = type =>
      `RestfulShesha.${type}Props<${genericsTypes}>${paramsInPath.length ? ` & {${paramsTypes}}` : ""}`;

    const generated = verb === "get"
      ? `${description}export const ${camelcase(componentName)} = (${
          paramsInPath.length ? `{${paramsInPath.join(", ")}, ...props}` : "props"
        }: ${propsType(
          "Get",
        )}, signal?: RequestInit["signal"]) => RestfulShesha.get<${genericsTypes}>(\`${route}\`, props, signal);\n\n`
      : `${description}export const ${camelcase(componentName)} = (${
          paramsInPath.length ? `{${paramsInPath.join(", ")}, ...props}` : "props"
        }: ${propsType(
          "Mutate",
        )}, signal?: RequestInit["signal"]) => RestfulShesha.mutate<${genericsTypes}>("${verb.toUpperCase()}", \`${route}\`, props, signal);\n\n`;

        return generated;
  },
};

function generateFetcher() {
  let apiObj = {};

  API_LIST.forEach(key => {
    const camelCasedName = camelcase(key);
    apiObj[`${camelCasedName}Api`] = {
      ...defaultConfiguration,
      output: `${ROOT_PATH}/${camelCasedName}.tsx`,
      url: `${STORYBOOK_BASE_URL}/swagger/service:${key}/swagger.json`,
    };
  });

  return apiObj;
}

module.exports = {
  ...generateFetcher(),
};
