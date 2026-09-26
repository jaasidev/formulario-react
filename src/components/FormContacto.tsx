import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomInput } from './CustomInput'
import { savedUser } from '../mocks/savedUser'
import { SavedUserData } from './SavedUserData'

const schema = z.object({
  name: z
    .string('El campo no puede estar vacio')
    .min(1, 'El nombre es requerido'),
  email: z
    .email('Correo electronico invalido')
    .min(1, 'El correo es requerido'),
  phone: z.string().min(9, 'Entre un numero de telefono valido').optional(),
  havePhoneNumber: z.boolean(),
})

export type FormValue = z.infer<typeof schema>
export function FormContacto() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<FormValue>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      havePhoneNumber: false,
      phone: undefined,
    },
  })

  const isPhone = watch('havePhoneNumber')

  const onSubmit: SubmitHandler<FormValue> = (data: FormValue) =>
    console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        control={control}
        name='name'
        label='Nombre'
        placeholder='Juan Luis Horny'
        type='text'
        error={errors.name}
      />
      <CustomInput
        control={control}
        name='email'
        type='email'
        placeholder='example@gmail.com'
        label='Correo Electronico'
        error={errors.email}
      />
      {/*Check de si existe o no numero de telefono*/}
      <div className='my-3'>
        <Controller
          control={control}
          name='havePhoneNumber'
          render={({ field }) => (
            <input
              id='havePhoneNumber'
              type='checkbox'
              className='checkbox checkbox-primary'
              onChange={field.onChange}
              checked={field.value}
            />
          )}
        />
        <label htmlFor='havePhoneNumber' className='label ms-2'>
          Tienes un numero de telefono
        </label>
      </div>

      {isPhone && (
        <CustomInput
          control={control}
          name='phone'
          label='Teléfono'
          error={errors.phone}
          type='text'
          placeholder='+53 000 000 00'
        />
      )}

      <p>Usuarios registrados</p>
      {savedUser.map((user) => {
        return (
          <SavedUserData
            key={user.id}
            badge='bg-warning'
            data={user.data}
            seter={setValue}
            user={user.name}
          />
        )
      })}

      <button type='submit' className='btn btn-primary mt-3'>
        Enviar
      </button>
    </form>
  )
}
