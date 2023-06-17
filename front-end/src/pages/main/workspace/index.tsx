import React, { memo, useEffect, useRef, useState } from 'react';
import styles from './index.less';
import DraggableContainer from '@/components/DraggableContainer';

import WorkspaceLeft from './components/WorkspaceLeft';
import WorkspaceRight from './components/WorkspaceRight';
import { ConfigProvider, theme } from 'antd';
const { useToken } = theme

interface IProps {
  className?: string;
}

export default memo<IProps>(function workspace(props) {
  const { className } = props;
  const draggableRef = useRef<any>();
  const { token } = useToken();

  return (
    <DraggableContainer className={styles.box}>
      <div ref={draggableRef} className={styles.box_left}>
        <WorkspaceLeft ></WorkspaceLeft>
      </div>
      <div className={styles.box_right}>
        <WorkspaceRight></WorkspaceRight>
      </div>
    </DraggableContainer>
  );
});
