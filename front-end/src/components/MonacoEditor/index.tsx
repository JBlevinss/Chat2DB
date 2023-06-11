import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useTheme } from '@/hooks';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { editorDefaultOptions } from '@/constants/monacoEditor';
import styles from './index.less';
import { ThemeType } from '@/constants/common';

export type IEditorIns = monaco.editor.IStandaloneCodeEditor;
export type IEditorOptions = monaco.editor.IStandaloneEditorConstructionOptions;
export type IEditorContentChangeEvent = monaco.editor.IModelContentChangedEvent;

interface IProps {
  id: string | number;
  value?: string;
  language?: string;
  className: string;
  onChange?: (v: string, e?: IEditorContentChangeEvent) => void;
  didMount?: (editor: IEditorIns) => any;
  options?: IEditorOptions;
  needDestroy?: boolean;
}

function MonacoEditor(props: IProps) {
  const {
    id,
    className,
    value = '',
    language = 'sql',
    didMount,
    options,
  } = props;

  const editorRef = useRef<IEditorIns>();
  const [editorVal, setEditorVal] = useState('');

  // 受控暂存value
  const valRef = useRef<string>('');

  const [appTheme] = useTheme();

  // init
  useEffect(() => {
    const editorIns = monaco.editor.create(
      document.getElementById(`monaco-editor-${id}`)!,
      {
        ...editorDefaultOptions,
        ...options,
        value,
        language,
        theme:
          appTheme.backgroundColor === ThemeType.Light
            ? 'default'
            : 'BlackTheme',
      },
    );
    editorRef.current = editorIns;
    didMount && didMount(editorIns); // incase parent component wanna handle editor

    monaco.editor.defineTheme('BlackTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [{ background: '#15161a' }],
      colors: {
        // 相关颜色属性配置
        'editor.foreground': '#ffffff',
        'editor.background': '#22272e', //背景色
      },
    });
    return () => {
      if (props.needDestroy) editorRef.current && editorRef.current.dispose();
    };
  }, []);

  // value 变了，直接设置editorValue
  useEffect(() => {
    updateEditor(value);
    valRef.current = value;
  }, [value]);

  // editor 变了，val 没变，设置 editorValue 为 value
  // useEffect(() => {
  //   if (editorVal !== valRef.current) {
  //     updateEditor(valRef.current);
  //   }
  // }, [editorVal]);

  useEffect(() => {
    const _ref = editorRef.current?.onDidChangeModelContent((e) => {
      const curVal = editorRef.current.getValue();
      if (props.onChange) props.onChange(curVal, e);
      setEditorVal(curVal);
    });

    return () => _ref && _ref.dispose();
  }, [props.onChange]);

  const updateEditor = (value: string) => {
    if (value !== undefined && editorRef && editorRef.current) {
      const model = editorRef.current.getModel();
      const range = model!.getFullModelRange();
      model!.pushEditOperations(
        [],
        [
          {
            range,
            text: value,
          },
        ],
        () => [editorRef.current.getSelection()],
      );
    }
  };

  useEffect(() => {
    monaco.editor.setTheme(
      appTheme.backgroundColor === ThemeType.Dark ? 'BlackTheme' : 'Default',
    );
  }, [appTheme.backgroundColor]);

  return (
    <div className={classnames(className, styles.box)}>
      <div id={`monaco-editor-${id}`} className={styles.editorContainer} />
    </div>
  );
}

export default MonacoEditor;
