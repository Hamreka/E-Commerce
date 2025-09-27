'use client'
import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner";
import { useRouter } from "next/navigation";





export default function Register() {
  const Route = useRouter()
  const schemaRegis = z.object({
    name:z.string().nonempty('name is required').min(2,'minimum char 2').max(15 , 'maximum char 15'),
    email:z.email('email invaild').nonempty('email is required'),
    password:z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,'enter valid email'),
    rePassword:z.string().nonempty('confirm is required'),
    phone:z.string().nonempty('phone is required').regex(/^(\+2)?01[0125][0-9]{8}$/, 'enter valid phone number'),
    

  }).refine((ele) => {
    return ele.password == ele.rePassword
  }, {
    path: ['rePassword'],
    error:'password not match'
  })
  const RegisterForm = useForm<z.infer<typeof schemaRegis>>({
    defaultValues: { 
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },
    resolver:zodResolver(schemaRegis)
  })
   async function handleRegister(values: z.infer<typeof schemaRegis>) {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,{
       method:"post",
       body:JSON.stringify(values),
       headers:{
         "Content-Type":"application/json"
       }
     })
     const data = await res.json()
     console.log(data);
     if (data.message == 'success') {
       toast.success('Account Created', { position: 'top-center' })
       Route.push('/login')
     } else {
       toast.error(data.message,{position:'top-center'})
     }
   
     
    
  }
  return (
    <div className='w-3/4 m-auto grid grid-cols-12 pt-15'>
      <div className='col-span-7'>
        <Image src='/images/sign.png'alt='signphoto' width={1500} height={100} />
      </div>
      <div className='col-span-5 mx-10'>
        <h1 className='text-3xl text-orange-500 text-center pb-5'>Register</h1>
        <Form {...RegisterForm}>
          <form className="space-y-2" onSubmit={RegisterForm.handleSubmit(handleRegister)}>
              <FormField
                    control={RegisterForm.control}
                    name="name"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Name:</FormLabel>
                        <FormControl>
                          <Input type='text' className="border-0 border-orange-400 border-b-2 rounded-none" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                )}
              />
              <FormField
                    control={RegisterForm.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email:</FormLabel>
                        <FormControl>
                          <Input type='email' className="border-0  border-orange-400 border-b-2 rounded-none" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                )}
              />
              <FormField
                    control={RegisterForm.control}
                    name="password"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Password:</FormLabel>
                        <FormControl>
                          <Input type='password' className="border-0  border-orange-400 border-b-2 rounded-none" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                )}
              />
              <FormField
                    control={RegisterForm.control}
                    name="rePassword"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Confirm password:</FormLabel>
                        <FormControl>
                          <Input type='password' className="border-0  border-orange-400 border-b-2 rounded-none" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                )}
              />
              <FormField
                    control={RegisterForm.control}
                    name="phone"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Phone:</FormLabel>
                        <FormControl>
                          <Input type='tel' className="border-0  border-orange-400 border-b-2 rounded-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                )}
              />

            <Button className='w-full rounded-none'>Register Now</Button>
          </form>
          
        </Form>
      </div>
      





    </div>
  )
}
