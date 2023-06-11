import React, { Fragment, memo, useEffect, useMemo, useRef, useState } from 'react';
import classnames from 'classnames';
import i18n from '@/i18n';
import CreateConnection from '@/components/CreateConnection';
import { DatabaseTypeCode } from '@/constants/database'
import type { MenuProps } from 'antd';
import { Button, Menu, Dropdown } from 'antd';
import {
  PieChartOutlined,
} from '@ant-design/icons';
import { databaseTypeList } from '@/constants/database';
import { IDatabase } from '@/typings/database';
import styles from './index.less';
import Iconfont from '@/components/Iconfont';

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

interface IProps {
}

export default memo<IProps>(function Connections(props) {
  const volatileRef = useRef<any>();
  const [createType, setCreateType] = useState<DatabaseTypeCode | null>();

  function handleCreateConnections(database: IDatabase) {
    setCreateType(database.code);
  }

  const menuItems: any = useMemo(() => Array.from({ length: 100 }).map((t, i) => {
    return getItem(`connection1${i}`, i)
  }), [])

  return <div className={classnames(styles.box)}>
    <div ref={volatileRef} className={styles.layoutLeft}>
      <div className={styles.pageTitle}>
        Connections
      </div>
      <div className={styles.menuBox}>
        <Menu
          className={styles.menu}
          mode="inline"
          items={menuItems}
        />
      </div>
    </div>
    <div className={styles.layoutRight}>
      {
        !createType &&
        <div className={styles.dataBaseList}>
          {
            databaseTypeList.map(t => {
              return <div key={t.code} className={styles.databaseItem} onClick={handleCreateConnections.bind(null, t)}>
                <div className={styles.databaseItemMain}>
                  <div className={styles.databaseItemLeft}>
                    <div className={styles.logoBox}>
                      <Iconfont code={t.icon} />
                    </div>
                    {t.name}
                  </div>
                  <div className={styles.databaseItemRight}>
                    <Iconfont code="&#xe631;" />
                  </div>
                </div>
              </div>
            })
          }
          <div className={styles.databaseItemSpacer}></div>
          <div className={styles.databaseItemSpacer}></div>
        </div>
      }
      <div className={classnames(styles.createConnections, { [styles.showCreateConnections]: createType })}>
        <CreateConnection
          closeCreateConnection={() => { setCreateType(null) }}
        ></CreateConnection>
      </div>
    </div>
  </div>
});

