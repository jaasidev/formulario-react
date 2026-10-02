export function ProgressBar({ steps }: { readonly steps: number }) {
  return (
    <ul className='steps'>
      <li className={steps >= 0 ? ' step step-primary' : 'step'}>
        Información Personal
      </li>
      <li className={steps >= 1 ? ' step step-primary' : 'step'}>Contraseña</li>
    </ul>
  )
}
