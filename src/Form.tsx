import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'

const schema = z
  .object({
    name: z.string().min(1, 'El nombre no puede estar vacío'),
    correo: z.email('').min(1, 'El correo es requerido'),
    edad: z
      .number()
      .min(1, 'La edad es requerida')
      .gte(18, 'Tiene que ser mayor de edad'),
    constraseña: z
      .string()
      .min(6, 'La contraseña tiene que ser mayor que 6 caracteres'),
    confirmContraseña: z
      .string()
      .min(6, 'La contraseña tiene que ser mayor que 6 caracteres'),
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

  const onSubmit: SubmitHandler<FormValue> = (data: FormValue) =>
    console.log(data)
  return <form onSubmit={handleSubmit(onSubmit)}></form>
}
