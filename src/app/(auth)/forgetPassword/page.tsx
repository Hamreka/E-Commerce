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





export default function ForgetPassword() {
  const Route = useRouter()
  const schemaForgetPass = z.object({
     email:z.email('email invaild').nonempty('email is required'),
  })
  const ForgetPassForm = useForm<z.infer<typeof schemaForgetPass>>({
    defaultValues: { 
    email:"",
    },
    resolver:zodResolver(schemaForgetPass)
  })
   async function handleForgetPass(values: z.infer<typeof schemaForgetPass>) {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,{
       method:"post",
       body:JSON.stringify(values),
       headers:{
         "Content-Type":"application/json"
       }
     })
     const data = await res.json()
     console.log(data);
     if (data.statusMsg == 'success') {
       toast.success('Check your email', { position: 'top-center' })
       Route.push('/restCode')
     } else {
       toast.error(data.message,{position:'top-center'})
     }
   
     
    
  }
  return (
    <div className='w-3/4 m-auto grid lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-4 pt-15'>
      <div className='col-span-6'>
        <Image src='/images/sign.png'alt='signphoto' width={1500} height={100} />
      </div>
      <div className='col-span-6 mx-10'>
        <h1 className='text-3xl text-orange-500 text-center py-5'>Send Email</h1>
        <Form {...ForgetPassForm}>
          <form className="space-y-2" onSubmit={ForgetPassForm.handleSubmit(handleForgetPass)}>
         
              <FormField
                    control={ForgetPassForm.control}
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
            <Button className='w-full rounded-none'>Send Verification Code</Button>
          </form>
          
        </Form>
      </div>
      





    </div>
  )
}
