import { Controller, type Control, type FieldError } from 'react-hook-form'
import type { FormValue } from './Form'
interface CustomInputProps {
  readonly name: keyof FormValue
  readonly control: Control<FormValue>
  readonly error?: FieldError
  readonly styles?: string
  readonly placeholder: string
  readonly label: string
}
export function CustomInputNumber({
  name,
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
            type='number'
            placeholder={placeholder}
            className={`input input-bordered w-full ${styles}`}
            {...field}
            onChange={(e) => {
              field.onChange(e.target.value === '' ? 0 : Number(e.target.value))
            }}
            value={field.value ?? ''}
          />
        )}
      />
      {error && <p className='text-error'>{error.message}</p>}
    </div>
  )
}
