import React, { useState } from 'react';

interface IRenderFormProps {
  dataSourceId: number | undefined;
  dataSourceType: string;
  tab: ITabsType;
  form: any;
  backfillData: any;
}

function RenderForm(props: IRenderFormProps) {
  const { dataSourceId, dataSourceType, tab, form, backfillData } = props;

  let aliasChanged = false;

  const dataSourceFormConfigMemo = useMemo<IDataSourceForm>(() => {
    return deepClone(dataSourceFormConfigs).find((t: IDataSourceForm) => {
      return t.type === dataSourceType;
    });
  }, []);

  const [dataSourceFormConfig, setDataSourceFormConfig] =
    useState<IDataSourceForm>(dataSourceFormConfigMemo);

  const initialValuesMemo = useMemo(() => {
    return initialFormData(dataSourceFormConfigMemo[tab].items);
  }, []);

  const [initialValues] = useState(initialValuesMemo);

  useUpdateEffect(() => {
    if (tab === 'baseInfo') {
      selectChange({
        name: 'authentication',
        value: backfillData.user ? 1 : 2,
      });
      regEXFormatting({ url: backfillData.url }, backfillData);
    }

    if (tab === 'ssh') {
      regEXFormatting({}, backfillData.ssh || {});
    }
  }, [backfillData]);

  function initialFormData(dataSourceFormConfig: IFormItem[] | undefined) {
    let initValue: any = {};
    dataSourceFormConfig?.map((t) => {
      initValue[t.name] = t.defaultValue;
      if (t.selects?.length) {
        t.selects?.map((item) => {
          if (item.value === t.defaultValue) {
            initValue = {
              ...initValue,
              ...initialFormData(item.items),
            };
          }
        });
      }
    });
    return initValue;
  }

  function selectChange(t: { name: string; value: any }) {
    dataSourceFormConfig[tab].items.map((j, i) => {
      if (j.name === t.name) {
        j.defaultValue = t.value;
      }
    });
    setDataSourceFormConfig({ ...dataSourceFormConfig });
  }

  function onFieldsChange(data: any, datas: any) {
    // 将antd的格式转换为正常的对象格式
    if (!data.length) {
      return;
    }
    const keyName = data[0].name[0];
    const keyValue = data[0].value;
    const variableData = {
      [keyName]: keyValue,
    };
    const dataObj: any = {};
    datas.map((t: any) => {
      dataObj[t.name[0]] = t.value;
    });
    // 正则拆分url/组建url
    if (tab === 'baseInfo') {
      regEXFormatting(variableData, dataObj);
    }
  }

  function extractObj(url: any) {
    const { template, pattern } = dataSourceFormConfig.baseInfo;
    // 提取关键词对应的内容 value
    const matches = url.match(pattern)!;
    // 提取花括号内的关键词 key
    const reg = /{(.*?)}/g;
    let match;
    const arr = [];
    while ((match = reg.exec(template)) !== null) {
      arr.push(match[1]);
    }
    // key与value一一对应
    const newExtract: any = {};
    arr.map((t, i) => {
      newExtract[t] = t === 'database' ? matches[i + 2] || '' : matches[i + 1];
    });
    return newExtract;
  }

  function regEXFormatting(
    variableData: { [key: string]: any },
    dataObj: { [key: string]: any },
  ) {
    const { template, pattern } = dataSourceFormConfig.baseInfo;
    const keyName = Object.keys(variableData)[0];
    const keyValue = variableData[Object.keys(variableData)[0]];
    let newData: any = {};
    if (keyName === 'url') {
      //先判断url是否符合规定的正则
      if (pattern.test(keyValue)) {
        newData = extractObj(keyValue);
      }
    } else if (keyName === 'alias') {
      aliasChanged = true;
    } else {
      // 改变上边url动
      let url = template;
      Object.keys(dataObj).map((t) => {
        url = url.replace(`{${t}}`, dataObj[t]);
      });
      newData = {
        url,
      };
    }
    if (keyName === 'host' && !aliasChanged) {
      newData.alias = '@' + keyValue;
    }
    form.setFieldsValue({
      ...dataObj,
      ...newData,
    });
  }

  function renderFormItem(t: IFormItem): React.ReactNode {
    const FormItemTypes: { [key in InputType]: () => React.ReactNode } = {
      [InputType.INPUT]: () => (
        <Form.Item label={t.labelNameCN} name={t.name}>
          <Input />
        </Form.Item>
      ),

      [InputType.SELECT]: () => (
        <Form.Item label={t.labelNameCN} name={t.name}>
          <Select
            value={t.defaultValue}
            onChange={(e) => {
              selectChange({ name: t.name, value: e });
            }}
          >
            {t.selects?.map((t: ISelect) => (
              <Option key={t.value} value={t.value}>
                {t.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),

      [InputType.PASSWORD]: () => (
        <Form.Item label={t.labelNameCN} name={t.name}>
          <Input.Password />
        </Form.Item>
      ),
    };

    return (
      <Fragment key={t.name}>
        <div
          key={t.name}
          className={classnames({ [styles.labelTextAlign]: t.labelTextAlign })}
          style={{ width: `${t.width}%` }}
        >
          {FormItemTypes[t.inputType]()}
        </div>
        {t.selects?.map((item) => {
          if (t.defaultValue === item.value) {
            return item.items?.map((t) => renderFormItem(t));
          }
        })}
      </Fragment>
    );
  }

  return (
    <Form
      name={tab}
      form={form}
      initialValues={initialValues}
      className={styles.form}
      autoComplete="off"
      onFieldsChange={onFieldsChange}
    >
      {dataSourceFormConfig[tab]!.items.map((t) => renderFormItem(t))}
    </Form>
  );
}
