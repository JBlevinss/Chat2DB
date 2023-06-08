import { IChatData, IChatDataItem } from '@/typings/dashboard';
import React, { useState } from 'react';
import styles from './index.less';
import addImage from '@/assets/img/add.svg';
import cs from 'classnames';
import EchartsTest from '../echart-test';
import Line from '../chart/line';
import Pie from '../chart/pie';
import Bar from '../chart/bar';

interface IChartItemProps {
  index: number;
  data: IChatDataItem;
  connections: Array<any>;
  canAddRowItem: boolean;

  onDelete?: () => void;
  addChartTop?: () => void;
  addChartBottom?: () => void;
  addChartLeft?: () => void;
  addChartRight?: () => void;
}

enum IChatType {
  'Pie' = 'Pie',
  'Column' = 'Column',
  'Line' = 'Line',
}

const defaultData: IChatDataItem = {
  sqlContext: '',
  sqlData: '',
  chatType: 'Line',
  chatParam: {},
};
function ChartItem(props: IChartItemProps) {
  const [data, setData] = useState<IChatDataItem>(defaultData);
  const [isEditing, setIsEditing] = useState();

  const renderLeftAndRightPlusIcon = () => {
    return (
      props.canAddRowItem && (
        <>
          <div onClick={props.addChartLeft} className={styles.left_overlay_add}>
            <div className={styles.add_chart_icon}>
              <img
                className={styles.add_chart_plus_icon}
                src={addImage}
                alt="Add chart"
              />
            </div>
          </div>

          <div
            onClick={props.addChartRight}
            className={styles.right_overlay_add}
          >
            <div className={styles.add_chart_icon}>
              <img
                className={styles.add_chart_plus_icon}
                src={addImage}
                alt="Add chart"
              />
            </div>
          </div>
        </>
      )
    );
  };

  const renderTopAndBottomPlusIcon = () => {
    return (
      <>
        <div onClick={props.addChartTop} className={styles.top_overlay_add}>
          <div className={cs(styles.add_chart_icon, styles.add_chart_icon_y)}>
            <img
              className={styles.add_chart_plus_icon}
              src={addImage}
              alt="Add chart"
            />
          </div>
        </div>

        <div
          onClick={props.addChartBottom}
          className={styles.bottom_overlay_add}
        >
          <div className={cs(styles.add_chart_icon, styles.add_chart_icon_y)}>
            <img
              className={styles.add_chart_plus_icon}
              src={addImage}
              alt="Add chart"
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      {renderLeftAndRightPlusIcon()}
      {renderTopAndBottomPlusIcon()}
      <div>
        <div>
          <div>{IChatType[data?.chatType]}</div>
        </div>

        <div>opt</div>
      </div>

      <div>
        {
          // test
          props.index === 0 ? <Line /> : props.index === 1 ? <Pie /> : <Bar />
        }
      </div>

      <div>数据区块</div>

      <div></div>
    </div>
  );
}

export default ChartItem;
