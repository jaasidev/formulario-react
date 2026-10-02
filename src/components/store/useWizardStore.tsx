import { create } from 'zustand'
import type { FormValues } from '../wizard/Wizard'

interface StoreProps extends FormValues {
  setName: (value: string) => void
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  setConfirmarPasword: (value: string) => void
}
export const useWizardStore = create<StoreProps>((set) => ({
  name: '',
  email: '',
  confirmarPassword: '',
  password: '',
  setName: (value) => {
    set({ name: value })
  },
  setEmail: (value) => {
    set({ email: value })
  },
  setPassword: (value) => {
    set({ password: value })
  },
  setConfirmarPasword: (value) => {
    set({ confirmarPassword: value })
  },
}))
