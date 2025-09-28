'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckOutPayment } from '@/app/OrderAction/OrderAction'


export default function useCheckoutsession() {
  const schemaPayment = z.object({
      details:z.string().nonempty('details is required'),
      phone:z.string().nonempty('phone is required').regex(/^(\+2)?01[0125][0-9]{8}$/, 'enter valid phone number'),
      city:z.string().nonempty('city is required'),
  
    })
  const {cartid}:{cartid:string} = useParams()
  const useShippingForm = useForm<z.infer<typeof schemaPayment>>({
    defaultValues: {
       details: "",
       phone: "",
       city: ""
    },
     resolver:zodResolver(schemaPayment)
})
  async function checkOutSessionPayment(values:z.infer<typeof schemaPayment>) {
    console.log(values);
    const data = await CheckOutPayment(cartid, values)
    window.location.href = data.session.url
    //window.open(data.session.url)
    
    
  }
  return <>
     <div className='w-3/4 m-auto grid grid-cols-12 mt-15'>
          <div className='col-span-7'>
            <Image src='/images/checkout.jpg'alt='signphoto' width={1500} height={100} />
          </div>
          <div className='col-span-5 mx-10 mt-15'>
            <h1 className='text-3xl text-orange-500 text-center pb-5'>Check Out Payment</h1>
          <Form {...useShippingForm}>
        <form onSubmit={useShippingForm.handleSubmit(checkOutSessionPayment)}>
           <FormField
            control={useShippingForm.control}
            name="details"
            render={({field}) => (
            <FormItem>
            <FormLabel className='pt -2'>details:</FormLabel>
            <FormControl>
              <Input {...field} type="text" className="border-0  border-orange-400 border-b-2 rounded-none" />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
           <FormField
            control={useShippingForm.control}
            name="phone"
            render={({field}) => (
            <FormItem>
           <FormLabel className='pt-2'>phone:</FormLabel>
            <FormControl>
              <Input {...field} type="text" className="border-0  border-orange-400 border-b-2 rounded-none" />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
           <FormField
            control={useShippingForm.control}
            name="city"
            render={({field}) => (
            <FormItem>
            <FormLabel className='pt -2'>city:</FormLabel>
            <FormControl>
              <Input {...field} type="text" className="border-0  border-orange-400 border-b-2 rounded-none" />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
            />
            <Button className='w-full rounded-none mt-2'>Payment</Button>
            </form>
     
           </Form>
      </div>
      </div>
      





    
      </>
       
}
