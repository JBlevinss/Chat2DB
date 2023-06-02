import { Link, Outlet } from 'umi';
import { ConfigProvider, theme } from 'antd';
import styles from './index.less';

export default function Layout() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <div className={styles.navs}>
        <Outlet />
      </div>
    </ConfigProvider>
  );
}
