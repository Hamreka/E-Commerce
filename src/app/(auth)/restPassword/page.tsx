'use client'
import Lottie from "lottie-react";
import Loadingbtn from "@/../public/icons/loading.json";
import React, { useState } from "react";
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
import  Link  from 'next/link';





export default function RestPassword() {
    const[loadingBtn , setBtn]=useState<boolean>(true)
  const Route = useRouter()
  const schemaRestPass = z.object({
     email:z.email('email invaild').nonempty('email is required'),
    newPassword:z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,'enter valid email'),

  })
  const RestPassForm = useForm<z.infer<typeof schemaRestPass>>({
    defaultValues: { 
    email:"",
    newPassword:"",
    },
    resolver:zodResolver(schemaRestPass)
  })
    async function handleRestPass(values: z.infer<typeof schemaRestPass>) {
       setBtn(false)
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,{
       method:"Put",
       body:JSON.stringify(values),
       headers:{
         "Content-Type":"application/json"
       }
     })
        const data = await res.json()
        setBtn(true)
     console.log(data);
     if (data.token) {
       toast.success('login successfully', { position: 'top-center' })
       Route.push('/')
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
        <h1 className='text-3xl text-orange-500 text-center pb-5'>Rest Password</h1>
        <Form {...RestPassForm}>
          <form className="space-y-2" onSubmit={RestPassForm.handleSubmit(handleRestPass)}>
         
              <FormField
                    control={RestPassForm.control}
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
                    control={RestPassForm.control}
                    name="newPassword"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Create New Password:</FormLabel>
                        <FormControl>
                          <Input type='password' className="border-0  border-orange-400 border-b-2 rounded-none" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                )}
                      />
                      
                      {
                          loadingBtn ?<Button className='w-full rounded-none '>Rest Password</Button> : <Button type="button" className='w-full rounded-none bg-gray-400 hover:bg-gray-400 '><i style={{ width: 70, height: 70 }}><Lottie animationData={Loadingbtn} loop={true} autoplay={true} /></i></Button>
                      }
            
            
          </form>
          
        </Form>
      </div>
      





    </div>
  )
}
