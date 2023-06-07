export type IChatType = 'Pie' | 'Column' | 'Line';

export interface IChatData {
  name: string;
  data: Array<IChatDataItem[]>;
}

export interface IChatDataItem {
  sqlContext: string;
  sqlData: any;
  chatType: IChatType;
  chatParam: any;
}
