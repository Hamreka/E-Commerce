import { Button } from '@/components/ui/button'
import { productItem } from '@/types/productDetails.type'
import Image from 'next/image'
import React from 'react'
import ProductSlider from './../ProductSlider/ProductSlider';
import AddCartBtn from '../ProductCard/AddCartBtn';

export default function ProductDetailsCard({ product }: { product: productItem }) {
    
       const {category:{name} ,imageCover, _id ,ratingsAverage, title , price , description , images }= product
  return (
      <div className='w-11/12 m-auto'>
          <div className=' grid lg:grid-cols-12 md:grid-cols-5 sm:grid-cols-4 grid-cols-1 items-center'>
              <div className='col-span-4'>
                <ProductSlider images={images}/>
              </div>
        <div className='col-span-8'>
                  <h5 className='text-orange-600'>{name}</h5>
                  <h1 className='text-3xl font-bold mb-2'>{title}</h1>
                  <p className='font-normal mb-5'>{description}</p>
                   <div className=' flex justify-between mb-10'>
                        <span>{price} EGP</span>
                        <span><i className=' fa-solid fa-star text-yellow-400'></i> {ratingsAverage}</span>    
                  </div>
                   <AddCartBtn id={_id} />
                  
              </div>
          </div>
    </div>
  )
}
  