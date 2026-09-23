import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm, type SubmitHandler, useFieldArray } from 'react-hook-form'
import { CustomInput } from './CustomInput'
import { useState, useRef, type ChangeEventHandler } from 'react'

const participante = z.object({
  name: z.string().min(1, 'El nombre del participante no puede estar vacío'),
})
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
    participantes: z.array(participante),
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
    formState: { errors, isValid },
  } = useForm<FormValue>({ resolver: zodResolver(schema) })
  const checkRef = useRef<HTMLInputElement>(null)
  const { fields, append, remove } = useFieldArray({
    name: 'participantes',
    control: control,
    shouldUnregister: true,
  })

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
      <CustomInput
        type='number'
        control={control}
        name='edad'
        label='Edad'
        placeholder='0'
        error={errors.edad}
      />

      <div className='mt-2'>
        <p className='text-2xl mb-2'>Participantes</p>
        {fields.map((field, index) => {
          return (
            <div
              key={field.id}
              className='flex justify-between items-center mb-2 gap-2'
            >
              <CustomInput
                name={`participantes.${index}.name` as const}
                control={control}
                label='Participante'
                placeholder='Juancito'
                type='text'
                error={errors.participantes?.[index]?.name}
              />
              <button
                onClick={() => remove(index)}
                className='btn btn-error mt-2.5'
              >
                Eliminar
              </button>
            </div>
          )
        })}
      </div>
      <button
        className='btn btn-primary text-center'
        onClick={() => append({ name: '' })}
      >
        Agregar
      </button>

      {/* Submit */}
      <div className='form-control w-full mt-6'>
        <button
          type='submit'
          className='btn btn-primary w-full'
          disabled={!isValid}
        >
          Registrarse
        </button>
      </div>
    </form>
  )
}
