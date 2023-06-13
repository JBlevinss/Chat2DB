import React, { memo, useRef } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import DraggableContainer from '@/components/DraggableContainer';
import { Cascader, Divider } from 'antd';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import Console from '@/components/Console';
interface IProps {
  className?: string;
}
interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

export default memo<IProps>(function Chart(props) {
  const { className } = props;
  const volatileRef = useRef<any>();
  const resultRef = useRef<any>(null);

  const onChange = (value: string[]) => {
    console.log(value);
  };

  const renderBoxLeft = () => {
    return (
      <>
        <div className={styles.box_left_db}>
          <Cascader
            options={options}
            onChange={onChange}
            placeholder="Please select"
            changeOnSelect
            bordered={false}
            allowClear={false}
          />

          <div>
            <SyncOutlined />
            <PlusOutlined />
          </div>
        </div>

        <div className={styles.box_left_save}>Save</div>

        <Divider />
        <div className={styles.box_left_connection}>connection</div>
      </>
    );
  };

  const renderBoxRight = () => {
    return (
      <DraggableContainer layout="column" className={styles.box_right_center}>
        <div ref={resultRef} className={styles.box_right_console}>
          <Console canAi2Lang={false} />
        </div>
        <div className={styles.box_right_result}>
          <p>Result</p>
          <p>Result</p>
          <p>Result</p>
          <p>Result</p>
          <p>Result</p>
          <p>Result</p>
          <p>Result</p>
          <p>Result</p>
          <p>Result</p>
        </div>
      </DraggableContainer>
    );
  };
  return (
    <DraggableContainer className={styles.box}>
      <div ref={volatileRef} className={styles.box_left}>
        {renderBoxLeft()}
      </div>
      <div className={styles.box_right}>{renderBoxRight()}</div>
    </DraggableContainer>
  );
});
