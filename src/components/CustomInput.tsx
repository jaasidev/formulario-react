import {
  Controller,
  type Control,
  type FieldError,
  type FieldPathByValue,
} from 'react-hook-form'
import type { FormValues } from './wizard/Wizard'

interface CustomInputProps {
  readonly name: FieldPathByValue<FormValues, string | number>
  readonly type: string
  readonly control: Control<FormValues>
  readonly error?: FieldError
  readonly styles?: string
  readonly placeholder: string
  readonly label: string
}
export function CustomInput({
  name,
  type,
  control,
  error,
  styles,
  placeholder,
  label,
}: CustomInputProps) {
  return (
    <div className='form-control w-full'>
      <label htmlFor={name} className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            className={`input input-bordered w-full ${styles}`}
            {...field}
            value={field.value ?? ''}
            {...(type === 'number' && {
              onChange: (event) => {
                const value = event.target.value

                field.onChange(value === '' ? '' : Number(value))
              },
            })}
          />
        )}
      />
      {error && <p className='text-error'>{error.message}</p>}
    </div>
  )
}
