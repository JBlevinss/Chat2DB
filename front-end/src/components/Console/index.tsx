import { formatParams, uuid } from '@/utils/common';
import connectToEventSource from '@/utils/eventSource';
import React, { useMemo, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import Editor from './Editor';

interface IProps{
  // 是否可以开启SQL转到自然语言的相关ai操作
  canAi2Lang: boolean;
}

function Console(props: IProps) {
  const uid = useMemo(() => uuid(), []);
  const chatResult = useRef('');

  const onPressChatInput = (value: string) => {
    const params = formatParams({
      message: value,
    });

    const handleMessage = (message: string) => {
      try {
        const isEOF = message === '[DONE]';
        if (isEOF) {
          closeEventSource();
          return;
        }
        chatResult.current += JSON.parse(message).content;
        console.log(chatResult.current);
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
    <div>
      <ChatInput onPressEnter={onPressChatInput} />
      {/* <div key={uuid()}>{chatContent.current}</div> */}
      <Editor chatResult={chatResult.current} />
    </div>
  );
}

export default Console;
