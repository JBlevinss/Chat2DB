import React, { memo, useRef, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import DraggableContainer from '@/components/DraggableContainer';
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

const items: MenuItem[] =  Array.from({length:100}).map((t,i)=>{
  return getItem(`Connections ${i}`, i, <PieChartOutlined />)
})

interface IProps {
  className?: string;
}

export default memo<IProps>(function Connect(props) {
  const { className } = props;
  const volatileRef = useRef<any>();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <DraggableContainer
      volatileDom={{
        volatileRef,
        volatileIndex: 0,
      }}
      className={classnames(styles.box, className)}
    >
      <div ref={volatileRef} className={styles.layoutLeft}>
        <div className={styles.pageTitle}>
          Connections
        </div>
        <div className={styles.menuBox}>
          <Menu
            className={styles.menu}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            inlineCollapsed={collapsed}
            items={items}
          />
        </div>
      </div>
      <div className={styles.layoutRight}>
        {
          Array.from({length:8}).map(t=>{
            return <div className={styles.databaseItem}>
              database
            </div>
          })
         
        }
         <div className={styles.databaseItem}></div>
         <div className={styles.databaseItem}></div>
      </div>
    </DraggableContainer>
  );
});
