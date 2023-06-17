import { formatParams, uuid } from '@/utils/common';
import connectToEventSource from '@/utils/eventSource';
import { Button, Spin } from 'antd';
import React, { ForwardedRef, useMemo, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import Editor, { IExportRefFunction } from './MonacoEditor';
import { format } from 'sql-formatter';
import MonacoEditor from 'react-monaco-editor';

import styles from './index.less';
import Loading from '../Loading/Loading';

interface IProps {
  /** 是否开启AI输入 */
  hasAiChat: boolean;
  /** 是否可以开启SQL转到自然语言的相关ai操作 */
  hasAi2Lang: boolean;
}

function Console(props: IProps) {
  const { hasAiChat = true } = props;
  const uid = useMemo(() => uuid(), []);
  const chatResult = useRef('');
  const editorRef = useRef<IExportRefFunction>();
  const [context, setContext] = useState('123123');
  const [isLoading, setIsLoading] = useState(false);

  const onPressChatInput = (value: string) => {
    const params = formatParams({
      message: value,
    });

    // setIsLoading(true);

    const handleMessage = (message: string) => {
      try {
        const isEOF = message === '[DONE]';
        if (isEOF) {
          closeEventSource();
          // setContext(context + '\n' + chatResult.current + '\n\n\n');
          setIsLoading(false);
          return;
        }
        chatResult.current += JSON.parse(message).content;
        setContext((prevData) => prevData + JSON.parse(message).content);
      } catch (error) {
        console.log('handleMessage', error);
      }
    };
    const handleError = (error: any) => {
      console.error('Error:', error);
    };

    const closeEventSource = connectToEventSource({
      url: `/api/ai/chat1?${params}`,
      uid,
      onMessage: handleMessage,
      onError: handleError,
    });
  };

  return (
    <div className={styles.console}>
      <Spin spinning={isLoading} style={{ height: '100%' }}>
        {hasAiChat && <ChatInput onPressEnter={onPressChatInput} />}
        {/* <div key={uuid()}>{chatContent.current}</div> */}
        <Editor
          id={0}
          ref={editorRef}
          value={context}
          onChange={(v) => setContext(v)}
          className={hasAiChat ? styles.console_editor_with_chat : styles.console_editor}
        />
        {/* <MonacoEditor
          // id={0}
          value={context}
          onChange={(v) => setContext(v)}
          className={hasAiChat ? styles.console_editor_with_chat : styles.console_editor}
        /> */}
      </Spin>

      <div className={styles.console_options_wrapper}>
        <div>
          <Button
            type="primary"
            style={{ marginRight: '10px' }}
            onClick={() => {
              let curContent = editorRef?.current?.getCurrentSelectContent();
              if (!curContent) {
                curContent = editorRef?.current?.getAllContent();
              }
              if (!curContent) {
                return;
              }
            }}
          >
            RUN
          </Button>
          <Button type="default">SAVE</Button>
        </div>
        <Button
          type="text"
          onClick={() => {
            const contextTmp = editorRef?.current?.getAllContent();
            setContext(format(contextTmp || ''));
          }}
        >
          Format
        </Button>
      </div>
    </div>
  );
}

export default Console;
