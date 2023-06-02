import { Outlet } from 'umi';
import { ConfigProvider, theme } from 'antd';
import styles from './index.less';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';

export default function Layout() {
  return (
    <ConfigProvider
      locale={enUS}
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
