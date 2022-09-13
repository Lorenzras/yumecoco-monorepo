import { debounce, FormControl, FormHelperText, Input } from '@mui/material';
import { useField } from 'formik';
import { ChangeEvent, useState } from 'react';
import { useSetWhenCostMinus } from '../hooks/useSetWhenCostMinus';

export const FormikInput = (
  { name }:
  {
    name: string,
  },
) => {
  const [field, meta, helpers] = useField(name);

  // 入力中一時的にコンポーネント内にInputのステートを管理する
  const [inputVal, setInputVal] = useState<string | null>(null);
  const { error, touched } = meta;

  const flg = false;
  
  const changeHandlerInput
  : React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined

    = debounce((el: ChangeEvent<HTMLInputElement>) => {
      if (name.indexOf('costPrice') !== -1) {
        // 原価がマイナスに変わった時のみ、値をセットする
        if ((field.value >= 0) && (Number(el.target.value) < 0)) {
          console.log('ここに処理を追加する?');
          // 数量を1、利益率を0にする、税を非課税にする
          // useSetWhenCostMinus(flg, name);
        }
      }
      field.onChange(el);
      setInputVal(null); // 本フォームのステート画面に反映させるように、リセットする。
    }, 1000);


  return (
    <FormControl variant="standard">
      <Input
        {...field} error={!!error && touched}
        onInput={(el) => {
          // 入力中コンポーネント内のInputのステートを更新
          if (!touched) helpers.setTouched(true);

          setInputVal((el as ChangeEvent<HTMLInputElement>).target.value);
        }}
        value={inputVal === null ? field.value : inputVal} // inputValは空なら、入力中ではないということなので、本フォームのfield.valueを反映させる。
        onChange={changeHandlerInput}
      />
      {(!!error && touched) &&
        <FormHelperText error={!!error && touched}>
          {error}
        </FormHelperText>}
    </FormControl>
  );
};