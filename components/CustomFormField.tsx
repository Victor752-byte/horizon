import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldPath } from 'react-hook-form'
import { z } from "zod"
import { FormSchema} from '@/lib/utils'

const AuthFormSchema = FormSchema('sign-up')
interface TCustomFormFieldProps{
    control: Control<z.infer<typeof AuthFormSchema>>,
    label: string,
    name: FieldPath<z.infer<typeof AuthFormSchema>>,
    placeholder: string,
    hint?: string
}

const CustomFormField = ({ control, label, name, placeholder, hint}: TCustomFormFieldProps) => {
  return (
    <div>
      <FormField
              control={control}
              name={name}
              render={({ field }) => (
                <div className='form-item'>
                  <FormLabel className='form-label'>{label}</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder={placeholder}
                    {...field}
                    type={name === 'password' ? 'password' : 'text'}
                    className='input-class placeholder:text-sm' 
                    />
                  </FormControl>
                  <span className='text-xs pl-1 font-light'>{hint}</span>
                  <FormMessage className='form-message mt-2' />
                </div>
              )}
            />
    </div>
  )
}

export default CustomFormField
