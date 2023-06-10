import React, { memo, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import i18n from '@/i18n';
import { IConnectionBase } from '@/typings/connection';
import ConnectionsServer from '@/service/connection';
import ConnectionLogo from '@/assets/img/connection.svg';

import styles from './index.less';
import DraggableContainer from '@/components/DraggableContainer';
import CreateConnection from '@/components/CreateConnection';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = Array.from({ length: 100 }).map((t, i) => {
  return getItem(`Connections ${i}`, i, <PieChartOutlined />)
})

interface IProps {
}

export default memo<IProps>(function Connect(props) {
  const volatileRef = useRef<any>();

  return <div className={classnames(styles.box)}>
    <div ref={volatileRef} className={styles.layoutLeft}>
      <div className={styles.pageTitle}>
        Connections
        </div>
      <div className={styles.menuBox}>
        <Menu
          className={styles.menu}
          mode="inline"
          items={items}
        />
      </div>
    </div>
    <div className={styles.layoutRight}>
      {/* <div className={styles.dataBaseList}>
          {
            Array.from({length:8}).map(t=>{
              return <div className={styles.databaseItem}>
                database
              </div>
            })

          }
          <div className={styles.databaseItem}></div>
          <div className={styles.databaseItem}></div>
        </div> */}
      <div className={styles.createConnections}>
        <CreateConnection></CreateConnection>
      </div>
    </div>
  </div>
});
