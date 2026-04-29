import './index.css'

function App() {
  return (
    <div className='min-h-screen bg-base-200 flex items-center justify-center p-4'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title text-2xl font-bold mb-4 justify-center'>
            Registro de Usuario
          </h2>

          <form className='space-y-4'>
            {/* Nombre */}
            <div className='form-control w-full'>
              <label htmlFor='nombre' className='label'>
                <span className='label-text'>Nombre completo</span>
              </label>
              <input
                id='nombre'
                type='text'
                placeholder='Ej. Juan Pérez'
                className='input input-bordered w-full'
              />
            </div>

            {/* Email */}
            <div className='form-control w-full'>
              <label htmlFor='email' className='label'>
                <span className='label-text'>Correo electrónico</span>
              </label>
              <input
                id='email'
                type='email'
                placeholder='ejemplo@correo.com'
                className='input input-bordered w-full'
              />
            </div>

            {/* Edad */}
            <div className='form-control w-full'>
              <label htmlFor='edad' className='label'>
                <span className='label-text'>Edad</span>
              </label>
              <input
                id='edad'
                type='number'
                placeholder='Ej. 25'
                className='input input-bordered w-full'
              />
            </div>

            {/* Contraseña */}
            <div className='form-control w-full'>
              <label htmlFor='password' className='label'>
                <span className='label-text'>Contraseña</span>
              </label>
              <input
                id='password'
                type='password'
                placeholder='********'
                className='input input-bordered w-full'
              />
            </div>

            {/* C. Contraseña */}
            <div className='form-control w-full'>
              <label htmlFor='confirmPassword' className='label'>
                <span className='label-text'>Confirmar Contraseña</span>
              </label>
              <input
                id='confirmPassword'
                type='password'
                placeholder='********'
                className='input input-bordered w-full'
              />
            </div>

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
                />
                <span className='label-text'>
                  Acepto los términos y condiciones
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className='form-control w-full mt-6'>
              <button type='submit' className='btn btn-primary w-full'>
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
