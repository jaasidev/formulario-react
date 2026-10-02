import { useFormContext, type FieldErrors } from 'react-hook-form'
import { CustomInput } from '../../CustomInput'
import type { FormValues } from '../Wizard'

export function Step2({
  errors,
}: {
  readonly errors: FieldErrors<FormValues>
}) {
  const { control } = useFormContext<FormValues>()

  return (
    <div className='space-y-4'>
      <CustomInput
        name='password'
        type='password'
        control={control}
        error={errors.password}
        placeholder='Introduce tu contraseña'
        label='Contraseña'
      />
      <CustomInput
        name='confirmarPassword'
        type='password'
        control={control}
        error={errors.confirmarPassword}
        placeholder='Confirma tu contraseña'
        label='Confirmar contraseña'
      />
    </div>
  )
}
