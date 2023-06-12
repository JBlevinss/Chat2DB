import MonacoEditor from '@/components/MonacoEditor';
import React, { useMemo } from 'react';
import styles from './index.less';

interface IProps {
  chatResult: string;
}

function Editor(props: IProps) {
  const { chatResult } = props;
  const context = useMemo(() => chatResult, [chatResult]);

  return <MonacoEditor id={'0'} className={styles.monaco_editor} />;
}

export default Editor;
