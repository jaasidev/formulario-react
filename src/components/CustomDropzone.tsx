import { useDropzone } from 'react-dropzone'
import type { FormValue, Image } from './forms/FormUsuario'
import { useEffect } from 'react'
import { type UseFormSetValue, type Control, Controller } from 'react-hook-form'

interface CustomDropzone {
  readonly name: 'images'
  readonly control: Control<FormValue>
  readonly error: string | undefined
  readonly seter: UseFormSetValue<FormValue>
  readonly files: Image[]
  readonly setFiles: React.Dispatch<React.SetStateAction<Image[]>>
}

export function CustomDropzone({
  name,
  control,
  error,
  seter,
  files,
  setFiles,
}: CustomDropzone) {
  const { getInputProps, getRootProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((val) =>
          Object.assign(val, {
            preview: URL.createObjectURL(val),
          }),
        ),
      )
      seter('images', acceptedFiles)
    },
  })

  const thumbs = files.map((val, index) => (
    <div key={index} className='border rounded-sm border-gray-500 p-1'>
      <img
        src={val.preview}
        className='w-20 h-20'
        onLoad={() => {
          URL.revokeObjectURL(val.preview)
        }}
        alt={`Thumb image`}
      />
    </div>
  ))

  useEffect(() => {
    console.log(files)
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <section className='container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              type='file'
              multiple={true}
              {...getInputProps()}
              name={field.name}
            />
          )}
        />
        {files.length === 0 && (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        {files.length > 0 && (
          <aside className='mt-2 flex items-center gap-2 flex-wrap'>
            {thumbs}
          </aside>
        )}
      </div>

      {error && <p className='text-error'>{error}</p>}
    </section>
  )
}
