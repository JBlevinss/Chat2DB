import React, { memo, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import i18n from '@/i18n';
import { IConnectionBase } from '@/typings/connection';
import ConnectionsServer from '@/service/connection';
import ConnectionLogo from '@/assets/img/connection.svg';

import styles from './index.less';
import DraggableContainer from '@/components/DraggableContainer';
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

  const [connectionList, setConnectionList] = useState<Array<IConnectionBase>>(
    [],
  );
  const [curConnectionItem, setCurConnectionItem] = useState<IConnectionBase>();

  useEffect(() => {
    getConnectionList();
  }, []);

  /**
   * 获取连接池列表数据
   */
  const getConnectionList = async () => {
    const res = await ConnectionsServer.getList({
      pageNo: 1,
      pageSize: 100,
    });
    if (res.data) {
      setConnectionList(res.data);
    }
  };

  const renderConnectionItem = (item: IConnectionBase) => {
    return (
      <div className={styles.connection_item}>
        <img src={ConnectionLogo} />
        <div>{item.alias}</div>
      </div>
    );
  };

  const renderBoxLeft = () => {
    return (
      <>
        <div className={styles.box_left_title}>{i18n('connection.title')}</div>

        <div className={styles.box_left_list}>
          {(connectionList || []).map((item) => renderConnectionItem(item))}
        </div>
      </>
    );
  };

  const renderBoxRight = () => {
    if (!curConnectionItem) {
      return <div>缺省</div>;
    }
    return <div></div>;
  };

  return (
    <DraggableContainer
      volatileDom={{
        volatileRef,
        volatileIndex: 0,
      }}
      className={classnames(styles.box, className)}
    >
      <div ref={volatileRef} className={styles.box_left}>
        {renderBoxLeft()}
      </div>

      <div className={styles.box_right}>{renderBoxRight()}</div>
    </DraggableContainer>
  );
});
