import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProgressBar } from './ProgressBar'
import { useState } from 'react'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'

const schema = z
  .object({
    name: z
      .string('El nombre es obligatorio')
      .min(1, 'El nombre debe tener al menos 1 carácter'),
    email: z
      .email('correo inválido')
      .min(1, 'El correo debe tener al menos 1 carácter'),
    password: z
      .string('La contraseña es obligatoria')
      .min(1, 'La contraseña debe tener al menos 1 carácter'),
    confirmarPassword: z
      .string('La confirmación de contraseña es obligatoria')
      .min(1, 'La confirmación debe tener al menos 1 carácter'),
  })
  .refine((data) => data.password === data.confirmarPassword, {
    path: ['confirmarPassword'],
    message: 'Las contraseñas deben coincidir',
  })

export type FormValues = z.infer<typeof schema>
export function Wizard() {
  const [steps, setSteps] = useState(0)
  const methods = useForm<FormValues>({ resolver: zodResolver(schema) })
  const handleClick = async () => {
    const { trigger } = methods

    const [nameIsValid, emailIsValid] = await Promise.all([
      trigger('name'),
      trigger('email'),
    ])

    if (nameIsValid && emailIsValid) {
      setSteps((steps) => steps + 1)
    }
  }
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data)
  }
  return (
    <div className='flex justify-center items-center min-h-screen '>
      <div className='card w-full max-w-md border bg-base-100 shadow-xl'>
        <div className='card-body'>
          <p className='card-title justify-center'>Formulario por pasos</p>
          <FormProvider {...methods}>
            <ProgressBar steps={steps} />
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {steps === 0 && <Step1 />}
              {steps === 1 && <Step2 />}
              <div className='flex justify-between items-center'>
                <button
                  className='btn btn-primary'
                  onClick={handleClick}
                  type='button'
                >
                  Siguiente
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
