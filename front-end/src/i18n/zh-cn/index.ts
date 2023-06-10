import menu from './menu';
import common from './common';
import connection from './connection';
import setting from './setting';
import workspace from './workspace';

export default {
  lang: 'zh-cn',
  ...connection,
  ...common,
  ...setting,
  ...workspace,
  ...menu
};
