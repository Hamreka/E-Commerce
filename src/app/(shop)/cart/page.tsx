'use client'
import { ClearCart, getCartData, RemoveProCart, UpdateCartQuantity } from '@/app/CartAction/CartAction'
import { Button } from '@/components/ui/button'
import { getUserToken } from '@/getUserToken'
import { cart, CartData } from '@/types/cart.type'

import React, { useContext, useEffect, useState } from 'react'
import Image  from 'next/image';

import { toast } from 'sonner'
import { CountContext } from '@/CountProvider'
import  Link  from 'next/link';

export default function Cart() {
   const CountData = useContext(CountContext)
  const [currentId, setCurrentId] = useState<string>()
  const [cart, setCart] = useState<cart>()
  const [loading , setLoading]=useState(true)
  const [countloading , setCountLoading]=useState(false)

  useEffect(() => {getAllCartData()},[])
  async function getAllCartData() {
    setLoading(true)
    const data:CartData = await getCartData()
    setCart(data.data)
    setLoading(false)

    
  }
  async function DeleteProBrideg(id:string) {
   const data = await RemoveProCart(id)
    if (data.status == 'success') {
      toast.success('product removed', {position:'top-center'})
      setCart(data.data)
      const sum = data.data.products.reduce((total: number, item: { count: number }) => total += item.count, 0)
           CountData?.setCount(sum)
    }
  }
  async function ClearCartBrideg() {
    const data = await ClearCart()
    if (data.message == 'success') {
      toast.success('Cart cleared', {position:'top-center'})
      setCart(undefined)
      CountData?.setCount(0)
    }
    
  }
  async function UpdateQuantityBrideg(id: string, count: number) {
    setCurrentId(id)
    console.log(id);
    
    setCountLoading(true)
    const data = await UpdateCartQuantity(id, count)
    if (data.status == 'success') {
      setCart(data.data)
        const sum = data.data.products.reduce((total: number, item: { count: number }) => total += item.count, 0)
           CountData?.setCount(sum)
      setCountLoading(false)
    }
       
  
    
  }
  return <>
    <div className=' mb-20'>
    <h1 className=' text-orange-600 text-2xl my-7  ml-5 font-bold  '><i className="fa-solid fa-cart-shopping"></i>CART</h1>
     
    
     {loading ?   <div>
        <div className="sk-circle">
        <div className="sk-circle1 sk-child" />
        <div className="sk-circle2 sk-child" />
        <div className="sk-circle3 sk-child" />
        <div className="sk-circle4 sk-child" />
        <div className="sk-circle5 sk-child" />
        <div className="sk-circle6 sk-child" />
        <div className="sk-circle7 sk-child" />
        <div className="sk-circle8 sk-child" />
        <div className="sk-circle9 sk-child" />
        <div className="sk-circle10 sk-child" />
        <div className="sk-circle11 sk-child" />
        <div className="sk-circle12 sk-child" />
        </div>
    </div> :  <>
          
          {cart?.products && cart.products.length > 0 ? (<>
             <h1 className=' font-bold'>Total Price <span className='text-orange-600'>{cart?.totalCartPrice + ' LE'}</span> </h1>
             <button onClick={ClearCartBrideg} className='bg-red-500 rounded-none fixed right-0 my-3 cursor-pointer py-2 px-3 text-white hover:bg-red-700'>Clear All</button>
            <button className='bg-green-500 rounded-none fixed top-70 right-0 my-3 cursor-pointer py-2 px-3 text-white hover:bg-green-700'><Link href={'/checkoutsession'+'/'+ cart._id}>Procees to checkout</Link></button> 
            </>) : ( <p className="text-gray-500 font-semibold  relative top-50 text-center  ">Cart is empty</p>)} 
         
          {cart?.products.map((item) => {
            return <><div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8 " key={item._id}>
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
         
             <div className="space-y-6"  >
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 hover:shadow-md hover:shadow-orange-500  transition-shadow duration-500 dark:hover:shadow-white">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <Image src={item.product.imageCover} alt={item.product.title} width={100} height={100} />
                    <label htmlFor="counter-input" className="sr-only">{ item.product.quantity}</label>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center border-1 border-orange-400 rounded-2xl">
                          {item.count == 1 ?
                            (<Button onClick={() => { UpdateQuantityBrideg(item.product._id, item.count -= 1) }} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className=" h-[19px] w-6 shrink-0 items-center  rounded-3xl  mx-1 bg-white hover:bg-orange-200"> <i className="fa-solid fa-trash text-black"></i></Button>)
                            :
                            (<Button onClick={() => { UpdateQuantityBrideg(item.product._id, item.count -= 1) }} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className=" h-[19px] w-6 shrink-0 items-center  rounded-3xl  mx-1 bg-white hover:bg-orange-200"> <i className="fa-solid fa-minus text-black"></i></Button>)}
                      {countloading && currentId  == item.product._id ? <span className="loader"></span> : <span>{ item.count}</span> } 
                  <Button onClick={()=>{UpdateQuantityBrideg(item.product._id , item.count +=1)}} type="button" id="increment-button" data-input-counter-increment="counter-input" className=" h-[19px] w-5 shrink-0 items-center  rounded-3xl  mx-1 bg-white hover:bg-orange-200"><i className="fa-solid fa-plus text-black"></i></Button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-orange-600 ">{item.price+" LE"}</p>
                </div>
              </div>
              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <h1 className='text-2xl font-bold mb-2'>{item.product.title}</h1>
                <div className="flex items-center gap-4 mt-5">
                  <button type="button" className="inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-700 cursor-pointer"><i className="fa-solid fa-heart pb-1 "></i> Add to Favorites</button>
                  <button onClick={()=>{DeleteProBrideg(item.product._id)}} type="button" className="inline-flex items-center text-sm cursor-pointer font-medium text-red-600 hover:text-red-700 dark:text-red-500"><i className=' fa-solid fa-trash pb-1'></i> Remove</button>
                </div>
              </div>
            </div>
          </div>
              </div>
              </div>
          </div>
            </>
       })}  

      </>}
    </div>
  

  </>
  
}
