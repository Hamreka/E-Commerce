import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { product } from '@/types/product.type';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AddCartBtn from './AddCartBtn';
import AddWishBtn from '../WishList/AddWishBtn';


export default function ProductCard({ product }: { product:product }) {
    const {category:{name} ,imageCover ,ratingsAverage, title , price ,_id }= product
  return (
    <Card className=' border-1 border-orange-500 rounded-none hover:shadow-md  hover:shadow-orange-500  transition-shadow duration-500 cursor-pointer dark:bg-gray-700   dark:border-white dark:hover:shadow-white'>
     
      <Link href={'/products/'+ _id}>
        <CardHeader>
                 
                <Image src={imageCover} alt={title} width={200} height={100} className='w-full h-72 opject-cover rounded-2xl' />
            </CardHeader>
        </Link>
            <CardContent>
                  <div className=' flex justify-between items-center'>
                    <CardTitle className='text-orange-700 py-3'>{name}</CardTitle>
          <AddWishBtn id={_id}/>
                   </div>
                    <CardTitle className='font-normal'>{title.split(" ").slice(0, 2).join(" ")}</CardTitle>
                    <div className=' flex justify-between mt-5'>
                        <span>{price} EGP</span>
                        <span><i className=' fa-solid fa-star text-yellow-400'></i> {ratingsAverage}</span>    
                    </div>
            </CardContent>
            <CardFooter>
            
          <AddCartBtn id={_id} />
            </CardFooter>
    </Card>
  )
}
