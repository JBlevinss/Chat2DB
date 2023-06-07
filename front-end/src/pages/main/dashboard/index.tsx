import React, { memo, useEffect, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { IChatData } from '@/typings/dashboard';

interface IProps {
  className?: string;
}

const initDataList: IChatData[] = [
  {
    name: 'Demo',
    data: [
      [
        {
          sqlContext: 'sqlContext',
          sqlData: 'aa',
          chatType: 'Line',
          chatParam: {
            x: '',
            y: '',
          },
        },
      ],
    ],
  },
];

export default memo<IProps>(function Chart(props) {
  const { className } = props;

  const [dataList, setDataList] = useState(initDataList);

  useEffect(() => {
    // TODO: 获取图标列表数据
    //
  }, []);

  return (
    <div className={classnames(styles.box, className)}>
      <div className={styles.box_left}></div>
      <div className={styles.box_right}></div>
    </div>
  );
});
