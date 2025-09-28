'use client'
import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"




export default function RestCode() {
  const Route = useRouter()
  const schemaRestCode = z.object({
     resetCode:z.string().nonempty('Code is required'),
  })
  const RestCodeForm = useForm<z.infer<typeof schemaRestCode>>({
    defaultValues: { 
    resetCode:"",
    },
    resolver:zodResolver(schemaRestCode)
  })
   async function handleRestCode(values: z.infer<typeof schemaRestCode>) {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,{
       method:"post",
       body:JSON.stringify(values),
       headers:{
         "Content-Type":"application/json"
       }
     })
     const data = await res.json()
     console.log(data);
     if (data.status == 'Success') {
       toast.success('Done', { position: 'top-center' })
       Route.push('/restPassword')
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
        <h1 className='text-3xl text-orange-500 text-center pb-5'>Verification Code</h1>
        <Form {...RestCodeForm}>
          <form className="space-y-2" onSubmit={RestCodeForm.handleSubmit(handleRestCode)}>
         
              <FormField
                    control={RestCodeForm.control}
                    name="resetCode"
                    render={({field}) => (
                      <FormItem className=" justify-center">
                        <FormLabel> Verification Code </FormLabel>
                        <FormControl >
                           <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                            </InputOTP>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                )}
              />
            <Button className='w-full rounded-none'>Send Code</Button>
          </form>
          
        </Form>
      </div>
      





    </div>
  )
}
