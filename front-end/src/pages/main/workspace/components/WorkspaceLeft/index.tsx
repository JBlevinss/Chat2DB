import React, { memo, useState, useEffect, useRef } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { Cascader, Divider } from 'antd';
import connectionService from '@/service/connection';
import { getCurrentWorkspaceDatabase, setCurrentWorkspaceDatabase } from '@/utils/localStorage';
import { treeConfig } from '../Tree/treeConfig';
import Iconfont from '@/components/Iconfont';
import { TreeNodeType } from '@/constants/tree';

interface IProps {
  className?: string;
}

export default memo<IProps>(function WorkspaceLeft(props) {
  const { className } = props;

  return <div className={classnames(styles.box, className)}>
    <div className={styles.header}>
      <RenderSelectDatabase></RenderSelectDatabase>
    </div>
    <div className={styles.save_box}>Save</div>
    <Divider />
    <div className={styles.table_box}>connection</div>
  </div>
})

interface Option {
  value: number;
  label: string;
  children?: Option[];
}

export interface ICurrentWorkspaceDatabase {
  labelArr: string[];
  valueArr: number[];
}

export function RenderSelectDatabase() {
  const [options, setOptions] = useState<Option[]>();
  const [currentSelected, setCurrentSelected] = useState<ICurrentWorkspaceDatabase>(getCurrentWorkspaceDatabase());

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
          type: TreeNodeType.DATA_SOURCE,
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
    setCurrentSelected(currentWorkspaceDatabase);
    setCurrentWorkspaceDatabase(currentWorkspaceDatabase);
  };

  const loadData = (selectedOptions: any) => {
    if (selectedOptions.length > 1) {
      return
    }
    const targetOption = selectedOptions[0];
    treeConfig[TreeNodeType.DATA_SOURCE]?.getChildren({
      id: targetOption.value
    }).then(res => {
      let newOptions = res.map((t) => {
        return {
          label: t.name,
          value: t.key,
          type: TreeNodeType.DATABASE
        };
      });
      targetOption.children = newOptions;
      setOptions([...(options || [])]);
    })

    // if (targetOption.type === TreeNodeType.SCHEMAS) {
    //   treeConfig[TreeNodeType.DATA_SOURCE]?.getChildren({
    //     id: targetOption.value
    //   }).then(res => {
    //     let newOptions = res.map((t) => {
    //       return {
    //         label: t.name,
    //         value: t.name,
    //         type: TreeNodeType.SCHEMAS
    //       };
    //     });
    //     targetOption.children = newOptions;
    //     setOptions([...(options || [])]);
    //   })
    // } else {
    // }

  };

  const dropdownRender = (menus: React.ReactNode) => (
    <div>
      {menus}
      {/* <div style={{ height: 0, opacity: 0 }}>The footer is not very short.</div> */}
    </div>
  );

  return (
    <div className={styles.select_database_box}>
      <Cascader
        popupClassName={styles.cascader_popup}
        options={options}
        onChange={onChange}
        loadData={loadData}
        bordered={false}
        dropdownRender={dropdownRender}
      >
        <div className={styles.current_database}>
          <div className={styles.name}>
            {currentSelected.labelArr.join('/') || '点我选择'}
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
