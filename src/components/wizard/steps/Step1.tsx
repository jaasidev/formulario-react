import { useFormContext } from 'react-hook-form'
import { CustomInput } from '../../CustomInput'
import type { FormValues } from '../Wizard'

export function Step1() {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>()

  return (
    <div className='space-y-4'>
      <CustomInput
        name='name'
        type='text'
        control={control}
        error={errors.name}
        placeholder='Introduce tu nombre'
        label='Nombre'
      />
      <CustomInput
        name='email'
        type='email'
        control={control}
        error={errors.email}
        placeholder='Introduce tu correo'
        label='Correo electrónico'
      />
    </div>
  )
}
