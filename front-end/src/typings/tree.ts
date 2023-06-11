import { TreeNodeType } from '@/constants/tree';
import { DatabaseTypeCode } from '@/constants/database';

export interface ITreeNode {
  key: string;
  name: string;
  nodeType: TreeNodeType;
  databaseType?: DatabaseTypeCode;
  isLeaf?: boolean;
  children?: ITreeNode[];
  parent?: ITreeNode;
  columnType?: string;
}