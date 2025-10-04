'use client'
import { getWishData, RemoveProWish } from '@/app/WishListAction/WishListAction'


import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { wish, WishData } from '@/types/wishlist.type'
import AddCartBtn from '@/app/_Component/ProductCard/AddCartBtn'
import { toast } from 'sonner'
import { product } from '@/types/product.type';

export default function WishList() {
  const [wish, setWish] = useState<wish[]>([])
  
  useEffect(()=>{getWishDataBrideg()},[])
  async function getWishDataBrideg() {
    const data: WishData = await getWishData()
    setWish(data.data)  
  }
  async function RemoveProWishBrideg(id:string) {
   const data = await RemoveProWish(id)
    if (data.status == 'success') {
      toast.success('product removed', {position:'top-center'})
      setWish((prev) => prev.filter((item) => item.id !== id));
  
    }
  }
  
  return <>

    <div className="p-6">
       <h1 className=' text-orange-600 text-2xl my-7  ml-5 font-bold  '><i className="fa-solid fa-heart"></i> WISH LIST</h1>
    
      {wish.length && wish.length > 0 ? (<>
       <thead>
           <tr className="border-b text-left">
            <th className="p-3"></th>
            <th className="p-3">Product Name</th>
            <th className="p-3">Unit Price</th>
            <th className="p-3">Stock Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead></>) : (<p className="text-gray-500 font-semibold  relative top-50 text-center  ">Wish List is empty</p>)}
      <table className="w-full border-collapse">
       
       <tbody>
  {wish.map((item) => (
    <tr key={item._id} className="border-b">
      <td onClick={()=>{RemoveProWishBrideg(item._id)}} className="p-3 cursor-pointer text-red-500">❌</td>

      <td className="p-3 flex items-center gap-3">
        <Image src={item.imageCover} alt={item.title} width={56} height={64} className="w-14 h-16 object-cover"/>
        <span>{item.title}</span>
      </td>

      <td className="p-3">
        <span className="text-black dark:text-white">{item.price} LE</span>
      </td>

      <td className="p-3">
        <span className="text-green-600">{item.quantity}</span>
      </td>

      <td className="p-3">
        <AddCartBtn id={item._id}/>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  </>
}









