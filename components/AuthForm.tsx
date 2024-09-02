'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from './CustomFormField'
import { FormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
 


const AuthForm = ({type}: {type: string}) => {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const AuthFormSchema = FormSchema(type)
    // 1. Define your form.
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AuthFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)
    try {
      
      // Sign up with Appwrite and create user
      if(type === 'sign-up'){
        const newUser = await signUp(values)
        setUser(newUser)
      }

      // Sign user in
      if(type === 'sign-in'){
        const response = await signIn({
          email: values.email,
          password: values.password
        })
        if(response) router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally{
      setIsLoading(false)
    }

  }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='flex cursor-pointer items-center gap-1'>
            <Image
            src='/icons/logo.svg'
            width={34}
            height={34}
            alt='Horizon logo'
            />
            <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
            </Link>
            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user ? 'Link Account': type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                    <p className='text-16 font-normal text-gray-600'>
                        {user ? 'Link your account to get started' : 'Please enter your details'}
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>{/* PLAID LINK */}</div>
        ) : (
          <>
          
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {type === 'sign-up' && (
              <>
            <div className='flex gap-4'>
            <CustomFormField
            control={form.control}
            label='First Name'
            name="firstName"
            placeholder='Enter your first name'
            />
            <CustomFormField
            control={form.control}
            label='Last Name'
            name="lastName"
            placeholder='Enter your last name'
            />
            </div>
            <CustomFormField
            control={form.control}
            label='Address'
            name="address1"
            placeholder='Enter your specific addresss'
            />
            <CustomFormField
            control={form.control}
            label='City'
            name="city"
            placeholder='Enter your specific addresss'
            />
            <div className='flex gap-4'>
            <CustomFormField
            control={form.control}
            label='State'
            name="state"
            placeholder='Example: NY'
            />
            <CustomFormField
            control={form.control}
            label='Postal Code'
            name="postalCode"
            placeholder='Example: 11101'
            />
            </div>
            <div className='flex gap-4'>
            <CustomFormField
            control={form.control}
            label='Date of Birth'
            name="dateOfBirth"
            placeholder='Example YYYY MM DD'
            />
            <CustomFormField
            control={form.control}
            label='SSN'
            name="ssn"
            placeholder='Example 1234'
            />
            </div>
              </>
            )}

            <CustomFormField
            control={form.control}
            label='Email'
            name="email"
            placeholder='Enter your email'
            />
            <CustomFormField
            control={form.control}
            label='Password'
            name='password'
            placeholder='Enter your password'
            />
            <div className='flex flex-col gap-4'>
            <Button type="submit" className='form-btn' disabled={isLoading}>
              {isLoading ?
              <>
              <Loader2
              size={20}
              className='animate-spin'
              />
              Loading...
              </> :
              type === 'sign-in' ?
              'Sign-In' : 'Sign-Up'
              }
            </Button>
            </div>
          </form>
        </Form>

        <footer className='flex justify-center gap-1'>
          <p className='text-14 font-normal text-gray-600'>
            {type === "sign-in" 
            ? "Don't have an account?"
            : "Already have an account?"}
           </p>
           <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
           {type === 'sign-in' ? 'Sign-up' : 'Sign-in'}
           </Link>
        </footer>
          </>
        )}
    </section>
  )
}

export default AuthForm
