import type { FormValue } from './FormContacto'
import type { UseFormSetValue } from 'react-hook-form'
interface SavedUserDataProps {
  readonly user: string
  readonly badge: 'bg-warning' | 'bg-error' | 'bg-success'
  readonly data: FormValue
  readonly seter: UseFormSetValue<FormValue>
}

export function SavedUserData({
  user,
  badge,
  data,
  seter,
}: SavedUserDataProps) {
  const text =
    badge === 'bg-warning'
      ? 'Inactivo'
      : badge === 'bg-error'
        ? 'Desactivado'
        : 'Activo'

  const handleClick = () => {
    const { name, email, phone, havePhoneNumber } = data
    seter('name', name)
    seter('email', email)
    seter('havePhoneNumber', havePhoneNumber)
    if (phone) {
      seter('phone', phone)
    } else {
      seter('phone', undefined)
    }
  }
  return (
    <div
      className='flex justify-between items-center p-2 my-1 rounded-sm border border-primary'
      onClick={handleClick}
    >
      <p className='mb-0 font-bold text-white '>{user}</p>
      <div className='flex items-center gap-1'>
        <div className={`w-3 h-3 ${badge} rounded-sm`}></div>
        <p className='mb-0'>{text}</p>
      </div>
    </div>
  )
}
