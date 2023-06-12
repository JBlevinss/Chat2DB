import { IEditorOptions } from '@/components/MonacoEditor';

export const editorDefaultOptions: IEditorOptions = {
  fontFamily: `"Menlo", "DejaVu Sans Mono", "Liberation Mono", "Consolas", "Ubuntu Mono", "Courier New", "andale mono", "lucida console", monospace`,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  dragAndDrop: false,
  fontSize: 12,
  tabSize: 2,
  padding: {
    top: 2,
    bottom: 2,
  },
  lineHeight: 18,
  theme: 'vscode',
  minimap: {
    enabled: false,
  },
};
