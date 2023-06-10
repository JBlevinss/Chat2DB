import { DatabaseTypeCode } from '@/constants/database';
import { ConnectionEnv } from '@/constants/environment';

export interface IConnectionBase {
  id?: number;
  alias: string;
  url: string;
  user: string;
  password: string;
  type: DatabaseTypeCode;
  tabOpened: 'y' | 'n';
  EnvType: ConnectionEnv;
}
