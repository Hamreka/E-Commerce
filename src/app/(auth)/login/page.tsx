'use client'
import React, { useContext } from "react";
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
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { getUserToken } from "@/getUserToken";
import { CartData } from "@/types/cart.type";
import { getCartData } from "@/app/CartAction/CartAction";
import { CountContext } from "@/CountProvider";






export default function Login() {
  const CountData = useContext(CountContext)
  const Route = useRouter()
  const schemaLogin = z.object({
     email:z.email('email invaild').nonempty('email is required'),
    password:z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,'enter valid email'),

  })
  const LoginForm = useForm<z.infer<typeof schemaLogin>>({
    defaultValues: { 
    email:"",
    password:"",
    },
    resolver:zodResolver(schemaLogin)
  })
  async function handleLogin(values: z.infer<typeof schemaLogin>) {
      
    const data = await signIn('credentials', {
      email:values.email,
      password:values.password,
      redirect: false,
    })
    if (data?.ok) {
      toast.success('login successfully', { position: 'top-center' })
          const token  = await getUserToken()
             if(token){
                 const data: CartData = await getCartData()
                 
                 const sum = data.data.products.reduce((total, item) => total += item.count, 0)
                 CountData?.setCount(sum)
            
              
             }
              
        Route.push('/')
      
    } else {
      toast.error(data?.error,{position:'top-center'})
    }

  }
  return (
    <div className='w-3/4 m-auto grid lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-4 pt-15'>
      <div className='col-span-6 '>
        <Image src='/images/sign.png'alt='signphoto' width={1500} height={100} />
      </div>
      <div className='col-span-6 mx-10 '>
        <h1 className='text-3xl text-orange-500 text-center pb-5'>Login</h1>
        <Form {...LoginForm}>
          <form className="space-y-2" onSubmit={LoginForm.handleSubmit(handleLogin)}>
         
              <FormField
                    control={LoginForm.control}
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
                    control={LoginForm.control}
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
        
            <Link href={'/forgetPassword'} className=" text-[12px] hover:text-orange-400">Forgotten your password ?</Link>
            <Button className='w-full rounded-none '>Login</Button>
          </form>
          
        </Form>
      </div>
      





    </div>
  )
}
