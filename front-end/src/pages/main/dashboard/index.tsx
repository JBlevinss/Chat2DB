import React, { memo, useEffect, useRef, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { IChatData, IChatDataItem } from '@/typings/dashboard';
import DraggableContainer from '../components/DraggableContainer';
import Iconfont from '@/components/Iconfont';
import ChartItem from './chart-item';

interface IProps {
  className?: string;
}

const initChartItemData: IChatDataItem = {
  sqlContext: 'sqlContext',
  sqlData: 'aa',
  chatType: 'Line',
  chatParam: {
    x: '',
    y: '',
  },
};

const initDataList: IChatData[] = [
  {
    name: 'Demo',
    data: [[initChartItemData]],
  },
];

export default memo<IProps>(function Chart(props) {
  const { className } = props;

  const [dataList, setDataList] = useState(initDataList);
  const [curItem, setCurItem] = useState<IChatData>();
  const volatileRef = useRef<any>();

  useEffect(() => {
    // TODO: 获取列表数据
    //
  }, []);

  const renderContent = () => {
    const { data, name } = curItem || {};
    if (!data) return;

    return (
      <>
        <div className={styles.box_right_title}>
          <Iconfont code="&#xe60d;" />
          <div style={{ marginLeft: '8px' }}>{name}</div>
        </div>

        <div className={styles.box_right_content}>
          {data.map((rowData, i) => (
            <div key={i} className={styles.box_right_content_row}>
              {rowData.map((item, index) => (
                <div className={styles.box_right_content_column}>
                  <ChartItem
                    index={index}
                    key={`${i}_${index}`}
                    data={item}
                    connections={[]}
                    canAddRowItem={rowData.length < 3}
                    addChartTop={() => {
                      data.splice(index + 1, 0, [initChartItemData]);
                      setDataList([...dataList]);
                    }}
                    addChartBottom={() => {
                      data.splice(index + 1, 0, [initChartItemData]);
                      setDataList([...dataList]);
                    }}
                    addChartLeft={() => {
                      rowData.splice(index, 0, initChartItemData);
                      setDataList([...dataList]);
                    }}
                    addChartRight={() => {
                      rowData.splice(index + 1, 0, initChartItemData);
                      setDataList([...dataList]);
                    }}
                    onDelete={() => {
                      if (rowData.length === 1) {
                        data.splice(i, 1);
                        setDataList([...dataList]);
                      } else {
                        rowData.splice(i, 1);
                        setDataList([...dataList]);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <DraggableContainer
      volatileDom={{
        volatileRef,
        volatileIndex: 0,
      }}
      className={classnames(styles.box, className)}
    >
      <div ref={volatileRef} className={styles.box_left}>
        <div className={styles.box_left_title}>Dashboard</div>
        {(dataList || []).map((i, index) => (
          <div
            key={index}
            className={styles.box_left_item}
            onClick={() => setCurItem(i)}
          >
            <div>{i.name}</div>
          </div>
        ))}
      </div>
      <div className={styles.box_right}>{renderContent()}</div>
    </DraggableContainer>
  );
});
