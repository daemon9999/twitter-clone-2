import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploadProps {
    onChange: (base64: string) => void,
    value?: string,
    label: string,
    disabled?: boolean 
}

export default function ImageUpload({label,onChange,disabled,value} : ImageUploadProps) {
    const [base64, setBase64] = useState(value)

    const handleChange = useCallback((base64: string) => {
        onChange(base64)
    }, [onChange])

    const handleDrop = useCallback((files: any) => {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = (e: any) => {
            handleChange(e.target.result)
            setBase64(e.target.result)
        }
        reader.readAsDataURL(file)
    }, [handleChange])

    const {getRootProps, getInputProps} = useDropzone({
        disabled,
        maxFiles: 1,
        onDrop: handleDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })
  return (
    <div {...getRootProps({
        className: 'w-full p-4 text-white border-2 border-dotted border-neutral-700 '
    })}>
      <input {...getInputProps()}/>
      {base64 ? (
        <div className='flex items-center justify-center'><Image src={base64} height={100} width={100} alt='Uploaded image'/></div>
      ) : (
        <p>{label}</p>
      )}
    </div>
  )
}
