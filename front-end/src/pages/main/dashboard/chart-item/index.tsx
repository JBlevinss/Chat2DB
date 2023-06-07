import React, { useState } from 'react';
import styles from './index.less';

interface IChartItemProps {
  connections: Array<any>;
  canAddRowItem: boolean;

  onDelete?: () => void;
  addChartLeft?: () => void;
  addChartRight?: () => void;
}

interface IChartItemData {
  chartType: 'line' | 'pie';
}

function ChartItem(props: IChartItemProps) {

  const [data, setData] = useState<IChartItemData>();
  
  const renderPlusIcon = () => {
    return (
      props.canAddRowItem && (
        <>
          <div onClick={props.addChartLeft} className={styles.left_plus_icon}>
            <img />
          </div>
          <div onClick={props.addChartRight} className={styles.right_plus_icon}>
            <img />
          </div>
        </>
      )
    );
  };

  return <div className={styles.container}>{renderPlusIcon()}</div>;
}

export default ChartItem;
