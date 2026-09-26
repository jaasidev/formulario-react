import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomDropzone } from '../CustomDropzone'
import { CustomInput } from '../CustomInput'
import { useState } from 'react'

const schema = z.object({
  name: z.string('El nombre debe ser valido').min(1, 'El nombre es requerido'),
  email: z.email('Correo electronico invalido'),
  images: z
    .array(
      z.file().mime(['image/png', 'image/jpeg'], 'Formato de imagen invalido'),
    )
    .min(1, 'Debe cargar alguna imagen'),
})

export type FormValue = z.infer<typeof schema>
export interface Image extends File {
  preview: string
}

export function FormUsuario() {
  const [files, setFiles] = useState<Image[]>([])
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
      images: [],
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
        files={files}
        setFiles={setFiles}
      />

      <button className='btn mt-3 btn-primary w-100'>Enviar</button>
      <button
        className='btn btn-secondary w-100 mt-2'
        onClick={() => {
          reset()
          setFiles([])
        }}
      >
        Restaurar
      </button>
    </form>
  )
}
