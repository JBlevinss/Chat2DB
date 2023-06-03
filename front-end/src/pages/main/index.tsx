<<<<<<< HEAD
import React, { useEffect, useState, PropsWithChildren } from 'react';
import i18n from '@/i18n';
import { Button } from 'antd';
import { history } from 'umi';
import classnames from 'classnames';
import Setting from '@/components/Setting';
import Iconfont from '@/components/Iconfont';
import BrandLogo from '@/components/BrandLogo';

import Connect from './connect';
import Chart from './chart';
import Chat from './chat';

import styles from './index.less';

interface INavItem {
  title: string;
  key: string;
  icon: string;
  component?: React.ReactNode;
  openBrowser?: string;
}

const navConfig: INavItem[] = [
  {
    title: i18n('home.nav.database'),
    key: 'connect',
    icon: '\ue609',
    component: <Connect />,
  },
  {
    title: 'chatRobot',
    key: 'chat',
    icon: "\ue70e",
    component: <Chat />
  },
  {
    title: 'chart',
    key: 'chart',
    icon: "\ue70e",
    component: <Chart />
  },
  {
    title: i18n('home.nav.github'),
    key: 'github',
    icon: '\ue885',
    openBrowser: 'https://github.com/alibaba/Chat2DB'
  }
];

function Main() {
  const [activeNav, setActiveNav] = useState<INavItem>(navConfig[0]);

  useEffect(() => {
    // TODO:需要优化
    // navConfig.map(item => {
    //   if (window.location.hash.indexOf(item.path) === 1) {
    //     setActiveNav(item);
    //   }
    // })
    // history.listen((location) => {
    //   if (location.pathname.indexOf('/database') === 0) {
    //     setActiveNav(LNKConfig[0])
    //     return
    //   }
    //   LNKConfig.map(item => {
    //     if (item.path === location.pathname) {
    //       setActiveNav(item)
    //     }
    //   })
    // })
  }, []);

  function switchingNav(item: INavItem) {
    // if (item.openBrowser) {
    //   window.open(item.path);
    // } else {
    //   history.push(item.path);
    //   setActiveNav(item);
    // }
  }

  function jumpHome() {
    history.push('/');
  }

  return (
    <div className={styles.page}>
      <div className={styles.layoutLeft}>
        <div className={styles.dargBox}></div>
        <BrandLogo onClick={jumpHome} className={styles.brandLogo} />
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
        {
          navConfig.map(item => {
            return <div key={item.key} className={styles.componentBox}>
              {item.component}
            </div>
          })
        }
      </div>
    </div>
=======
import React from 'react';
import { Button, DatePicker } from 'antd';

function Main() {
  return (
    <>
      <Button>点击</Button>
      <DatePicker />
    </>
>>>>>>> d036f12318203d0b85c369df82b16d82d9dda990
  );
}

export default Main;
