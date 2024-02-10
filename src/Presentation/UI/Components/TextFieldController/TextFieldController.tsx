'use client'
import { TextField, TextFieldProps } from '@mui/material'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'



export const TextFieldController = (
  props: TextFieldProps & Pick<ControllerProps, 'name' | 'rules' | 'defaultValue'>,
): JSX.Element => {
  const { name, rules, defaultValue, onBlur: onBlurProps, ...rest } = props
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
        <TextField
          onChange={val => onChange(val)}
          value={value}
          error={!!error}
          helperText={error ? error.message : null}
          onBlur={e => {
            onBlur()
            onBlurProps?.(e)
          }}
          {...rest}
        />
      )}
    />
  )
}
