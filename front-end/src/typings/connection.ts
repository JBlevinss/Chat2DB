import { DatabaseTypeCode } from '@/constants/database';
import { Environment } from '@/constants';

export interface IConnectionBase {
  id?: number;
  alias: string;
  url: string;
  user: string;
  password: string;
  type: DatabaseTypeCode;
  tabOpened: 'y' | 'n';
  EnvType: Environment.EnvType;
}
