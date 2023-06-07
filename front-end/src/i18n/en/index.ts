import common from './common';
import menu from './menu';
import setting from './setting';
import workspace from './workspace';

export default {
  lang: 'en',
  ...common,
  ...setting,
  ...workspace,
  ...menu
};
