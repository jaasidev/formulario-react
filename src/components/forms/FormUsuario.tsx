import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomDropzone } from '../CustomDropzone'
import { CustomInput } from '../CustomInput'

const schema = z.object({
  name: z.string('El nombre debe ser valido').min(1, 'El nombre es requerido'),
  email: z.email('Correo electronico invalido'),
  images: z.array(z.file()),
})

export type FormValue = z.infer<typeof schema>

export function FormUsuario() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      images: new Array(1).fill(
        new File([''], 'image.png', {
          type: 'image/png',
          lastModified: Date.now(),
        }),
      ),
    },
    criteriaMode: 'firstError',
  })

  const onSubmit: SubmitHandler<FormValue> = (data: FormValue) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        name='name'
        type='text'
        control={control}
        label='Nombre'
        placeholder='Juan Gilberto'
        error={errors.name}
      />
      <CustomInput
        name='email'
        type='email'
        placeholder='example@gmail.com'
        control={control}
        label='Correo electronico'
        error={errors.email}
      />
      <CustomDropzone
        name='images'
        control={control}
        error={errors.images?.message}
        seter={setValue}
      />

      <button className='btn mt-3 btn-primary w-100'>Enviar</button>
      <button className='btn btn-secondary w-100 mt-2' onClick={() => reset()}>
        Restaurar
      </button>
    </form>
  )
}
