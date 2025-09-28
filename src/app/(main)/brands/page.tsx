import BrandsCard from '@/app/_Component/BrandsCard/BrandsCard'
import { BrandsData, brands } from '@/types/brands.type'
import React from 'react'

export default async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`)
  const data :BrandsData = await res.json()
   const brandList = Array.isArray(data.data) ? data.data : []
  
  
  return <>
  <h1 className=' text-orange-600 text-2xl my-7  ml-5 font-bold  '><i className="fa-solid fa-tags"></i> BRAND</h1>
    <div className='w-11/12 m-auto'>
      <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5'>
        {
          brandList.map((brands) => {
            return <BrandsCard key={brands._id} brands={brands}/>
          })
        }
      </div>
    </div>
  
  
  </>
  
}
