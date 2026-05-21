import { Controller, type Control, type ErrorOption } from 'react-hook-form'
import type { FormValue } from './Form'
interface CustomInputProps {
  readonly name: keyof FormValue
  readonly type: string
  readonly control: Control<FormValue>
  readonly error: ErrorOption
}
export function CustomInput({ name, control }: CustomInputProps) {
  return (
    <div className='form-control w-full'>
      <label
        htmlFor={name}
        className='label cursor-pointer justify-start gap-4'
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={name}
              type='checkbox'
              className='checkbox checkbox-primary'
              {...field}
            />
          )}
        />

        <span className='label-text'>{name}</span>
      </label>
    </div>
  )
}
