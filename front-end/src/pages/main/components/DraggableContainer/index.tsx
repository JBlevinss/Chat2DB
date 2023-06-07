import React, { memo, useRef, useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import classnames from 'classnames';

interface IProps {
  className?: string;
  children: React.ReactNode[];
  volatileDom: {
    volatileRef: any;
    volatileIndex: 0 | 1;
  };
  min?: number;
  direction?: 'row' | 'line';
  callback?: Function;
  showLine?: boolean;
}

export default memo<IProps>(function DraggableContainer({
  children,
  showLine = true,
  callback,
  min,
  className,
  direction = 'line',
  volatileDom,
}) {
  const { volatileRef, volatileIndex } = volatileDom;

  const DividerRef = useRef<HTMLDivElement | null>(null);
  const DividerLine = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const isLineDirection = useMemo(() => {
    return direction === 'line';
  }, []);

  useEffect(() => {
    if (!DividerRef.current) {
      return;
    }
    DividerRef.current.onmouseover = (e) => {
      setDragging(true);
    };
    DividerRef.current.onmouseout = (e) => {
      setDragging(false);
    };

    DividerRef.current.onmousedown = (e) => {
      if (!volatileRef.current) return;
      e.preventDefault();
      setDragging(true);
      const clientStart = isLineDirection ? e.clientX : e.clientY;
      const volatileBoxXY = isLineDirection
        ? volatileRef.current.offsetWidth
        : volatileRef.current.offsetHeight;
      document.onmousemove = (e) => {
        moveHandle(
          isLineDirection ? e.clientX : e.clientY,
          volatileRef.current,
          clientStart,
          volatileBoxXY,
        );
      };
      document.onmouseup = (e) => {
        setDragging(false);
        document.onmouseup = null;
        document.onmousemove = null;
      };
    };
  }, []);

  const moveHandle = (
    nowClientXY: any,
    leftDom: any,
    clientStart: any,
    volatileBoxXY: any,
  ) => {
    let computedXY = nowClientXY - clientStart;
    let finalXY = 0;

    if (volatileIndex === 1) {
      finalXY = volatileBoxXY - computedXY;
    } else {
      finalXY = volatileBoxXY + computedXY;
    }

    if (min && finalXY < min) {
      return;
    }
    if (isLineDirection) {
      leftDom.style.width = finalXY + 'px';
    } else {
      leftDom.style.height = finalXY + 'px';
    }
    callback && callback(finalXY);
  };

  return (
    <div className={classnames(styles.box, className)}>
      {children[0]}
      {
        <div
          style={{ display: showLine ? 'block' : 'none' }}
          ref={DividerLine}
          className={classnames(
            isLineDirection ? styles.divider : styles.rowDivider,
            { [styles.displayDivider]: !children[1] },
          )}
        >
          <div
            ref={DividerRef}
            className={classnames(
              styles.dividerCenter,
              { [styles.dragging]: dragging },
              { [styles.rowDragging]: dragging && !isLineDirection },
            )}
          />
        </div>
      }
      {children[1]}
    </div>
  );
});
