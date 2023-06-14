import React, { memo, useEffect, useRef, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import DraggableContainer from '@/components/DraggableContainer';
import { Cascader, Divider } from 'antd';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import Console from '@/components/Console';
import connectionService from '@/service/connection';
import lodash from 'lodash';
import Iconfont from '@/components/Iconfont';
interface IProps {
  className?: string;
}

export default memo<IProps>(function workspace(props) {
  const { className } = props;
  const volatileRef = useRef<any>();
  const resultRef = useRef<any>(null);

  const renderBoxLeft = () => {
    return (
      <>
        <div className={styles.box_left_db}>
          <RenderSeleteDatabase></RenderSeleteDatabase>
          {/* <Cascader
            options={options}
            onChange={onChange}
            loadData={loadData}
            placeholder="Please select"
            changeOnSelect
            bordered={false}
            allowClear={false}
          /> */}
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

interface Option {
  value: number;
  label: string;
  children?: Option[];
}

export function RenderSeleteDatabase() {
  const [options, setOptions] = useState<Option[]>();
  const [currentSeleted, setCurrentSeleted] = useState<{
    labelArr: string[]; valueArr: number[];
  }>({
    labelArr: [],
    valueArr: [],
  });

  useEffect(() => {
    getDataSource();
  }, []);

  function getDataSource() {
    let p = {
      pageNo: 1,
      pageSize: 999,
    };
    connectionService.getList(p).then((res) => {
      let newOptions: any = res.data.map((t) => {
        return {
          label: t.alias,
          value: t.id,
          isLeaf: false,
        };
      });
      setOptions(newOptions);
    });
  }

  const onChange: any = (valueArr: (number)[], selectedOptions: Option[]) => {
    let labelArr: string[] = [];
    labelArr = selectedOptions.map((t) => {
      return t.label;
    });
    setCurrentSeleted({
      labelArr,
      valueArr,
    });
  };

  const loadData = (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    let p = {
      pageNo: 1,
      pageSize: 999,
    };
    connectionService.getList(p).then((res) => {
      let newOptions = res.data.map((t) => {
        return {
          label: t.alias,
          value: t.id,
        };
      });
      targetOption.children = newOptions;
      setOptions([...(options || [])]);
    });
  };

  return (
    <div className={styles.selete_database_box}>
      <Cascader
        popupClassName={styles.cascader_popup}
        options={options}
        onChange={onChange}
        loadData={loadData}
        bordered={false}
      >
        <div className={styles.current_database}>
          <div className={styles.name}>
            {currentSeleted.labelArr.join('/') || '点我选择'}
          </div>
          <Iconfont code="&#xe608;" />
        </div>
      </Cascader>
      <div className={styles.other_operations}>
        <div className={styles.icon_box}><Iconfont code='&#xec08;' /></div>
      </div>
    </div>
  );
}
