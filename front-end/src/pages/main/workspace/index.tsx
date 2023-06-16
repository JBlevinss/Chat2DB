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
import { getCurrentWorkspaceDatabase, setCurrentWorkspaceDatabase } from '@/utils/localStorage';
import { treeConfig } from './components/Tree/treeConfig';
import { TreeNodeType } from '@/constants/tree';
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

export interface ICurrentWorkspaceDatabase {
  labelArr: string[];
  valueArr: number[];
}

export function RenderSeleteDatabase() {
  const [options, setOptions] = useState<Option[]>();
  const [currentSeleted, setCurrentSeleted] = useState<ICurrentWorkspaceDatabase>(getCurrentWorkspaceDatabase());

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
    const currentWorkspaceDatabase = {
      labelArr,
      valueArr,
    }
    setCurrentSeleted(currentWorkspaceDatabase);
    setCurrentWorkspaceDatabase(currentWorkspaceDatabase);
  };

  const loadData = (selectedOptions: any) => {
    if (selectedOptions.length > 1) {
      return
    }
    const targetOption = selectedOptions[0];
    let secondList = [];
    treeConfig[TreeNodeType.DATA_SOURCE]?.getChildren({
      id: targetOption.value
    }).then(res => {
      secondList = res.map((t) => {
        return {
          label: t.name,
          value: t.name,
        };
      });
      treeConfig[TreeNodeType.DATABASE]?.getChildren({
        id: targetOption.value
      }).then(res => {
        
        let secondList = res.map((t) => {
          return {
            label: t.schemaName,
            value: t.name,
          };
        });
        targetOption.children = newOptions;
        setOptions([...(options || [])]);
      })
      targetOption.children = newOptions;
      setOptions([...(options || [])]);
    })
    // let p = {
    //   pageNo: 1,
    //   pageSize: 999,
    // };
    // connectionService.getList(p).then((res) => {
    //   let newOptions = res.data.map((t) => {
    //     return {
    //       label: t.alias,
    //       value: t.id,
    //     };
    //   });
    //   targetOption.children = newOptions;
    //   setOptions([...(options || [])]);
    // });
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
