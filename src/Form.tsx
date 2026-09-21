import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { CustomInput } from './CustomInput'
import { useState, useRef, type ChangeEventHandler } from 'react'
import { CustomInputNumber } from './CustomInputNumber'

const schema = z
  .object({
    name: z.string().min(1, 'El nombre no puede estar vacío'),
    correo: z.email('Correo invalido').min(1, 'El correo es requerido'),
    constraseña: z
      .string()
      .min(6, 'La contraseña tiene que ser mayor que 6 caracteres'),
    confirmContraseña: z
      .string()
      .min(6, 'La contraseña tiene que ser mayor que 6 caracteres'),
    edad: z.number().positive('La edad tiene que ser mayor que 0'),
  })

  .refine((data) => data.constraseña === data.confirmContraseña, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmContraseña'],
  })

export type FormValue = z.infer<typeof schema>

export function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ resolver: zodResolver(schema) })
  const checkRef = useRef<HTMLInputElement>(null)
  const [ready, setReady] = useState(true)
  const handleChange: ChangeEventHandler = () => {
    if (checkRef.current) setReady(!checkRef.current.checked)
  }

  const onSubmit: SubmitHandler<FormValue> = (data: FormValue) =>
    console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='pb-2'>
      <CustomInput
        control={control}
        name='name'
        error={errors.name}
        label='Nombre completo'
        placeholder='Ej. Juan Pérez'
        type='text'
      />
      <CustomInput
        control={control}
        name='correo'
        error={errors.correo}
        label='Correo electrónico'
        placeholder='example@something.com'
        type='email'
      />
      <CustomInput
        control={control}
        name='constraseña'
        error={errors.constraseña}
        label='Contraseña'
        placeholder='********'
        type='password'
      />
      <CustomInput
        control={control}
        name='confirmContraseña'
        error={errors.confirmContraseña}
        label='Confirmar contraseña'
        placeholder='********'
        type='password'
      />
      <CustomInputNumber
        control={control}
        name='edad'
        label='Edad'
        placeholder='0'
        error={errors.edad}
      />

      {/* Términos */}
      <div className='form-control w-full mt-2'>
        <label
          htmlFor='terms'
          className='label cursor-pointer justify-start gap-4'
        >
          <input
            id='terms'
            type='checkbox'
            className='checkbox checkbox-primary'
            ref={checkRef}
            onChange={handleChange}
          />
          <span className='label-text'>Acepto los términos y condiciones</span>
        </label>
      </div>

      {/* Submit */}
      <div className='form-control w-full mt-6'>
        <button
          type='submit'
          className='btn btn-primary w-full'
          disabled={ready}
        >
          Registrarse
        </button>
      </div>
    </form>
  )
}
