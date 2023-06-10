import React, { useEffect, useState, PropsWithChildren } from 'react';
import i18n from '@/i18n';
import { Button } from 'antd';
import { history } from 'umi';
import classnames from 'classnames';
import Setting from '@/blocks/Setting';
import Iconfont from '@/components/Iconfont';
import BrandLogo from '@/components/BrandLogo';

import DataSource from './connections';
import Workspace from './workspace';
import Dashboard from './dashboard';
import Chat from './chat';

import styles from './index.less';
import { INavItem } from '@/typings/main';

const navConfig: INavItem[] = [
  {
    key: 'connections',
    icon: '\ue609',
    component: <DataSource />,
  },
  {
    key: 'workspace',
    icon: '\ue70e',
    component: <Workspace />,
  },
  {
    key: 'dashboard',
    icon: '\ue70e',
    component: <Dashboard />,
  },
  {
    key: 'github',
    icon: '\ue885',
    openBrowser: 'https://github.com/alibaba/Chat2DB',
  },
];

function MainPage() {
  const [activeNav, setActiveNav] = useState<INavItem>(navConfig[0]);

  function switchingNav(item: INavItem) {
    if (item.openBrowser) {
      window.open(item.openBrowser);
    } else {
      setActiveNav(item);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.layoutLeft}>
        {/* <div className={styles.dargBox}></div> */}
        <BrandLogo onClick={() => {}} className={styles.brandLogo} />
        <ul className={styles.navList}>
          {navConfig.map((item, index) => {
            return (
              <li
                key={item.key}
                className={classnames({
                  [styles.activeNav]: item.key == activeNav.key,
                })}
                onClick={switchingNav.bind(null, item)}
              >
                <Iconfont className={styles.icon} code={item.icon} />
                {/* <div>{item.title}</div> */}
              </li>
            );
          })}
        </ul>
        <div className={styles.footer}>
          <Setting className={styles.setIcon}></Setting>
        </div>
      </div>
      <div className={styles.layoutRight}>
        {navConfig.map((item) => {
          return (
            <div
              key={item.key}
              className={styles.componentBox}
              hidden={activeNav.key !== item.key}
            >
              {item.component}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
