import { Controller, type Control, type ErrorOption } from 'react-hook-form'
import type { FormValue } from './Form'
interface CustomInputProps {
  readonly name: keyof FormValue
  readonly type: string
  readonly control: Control<FormValue>
  readonly error: ErrorOption
}
export function CustomInput({ name, type, control, error }: CustomInputProps) {
  return (
    <div className='form-control w-full'>
      <label htmlFor={name} className='label'>
        <span className='label-text'>{name}</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            className='input input-bordered w-full'
          />
        )}
      />
      {error && <p>{error.message}</p>}
    </div>
  )
}
