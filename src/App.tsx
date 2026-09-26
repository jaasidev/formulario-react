import { FormUsuario } from './components/forms/FormUsuario'
import './index.css'

function App() {
  return (
    <div className='min-h-screen bg-base-200 flex items-center justify-center p-4'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title text-2xl font-bold mb-4 justify-center'>
            Formulario
          </h2>

          <FormUsuario />
        </div>
      </div>
    </div>
  )
}

export default App
