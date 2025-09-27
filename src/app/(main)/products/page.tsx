import ProductCard from '@/app/_Component/ProductCard/ProductCard'
import { product, ProductData } from '@/types/product.type'
import React from 'react'



export default async function Home() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
  const data:ProductData = await res.json()
  const productList:product[] = data.data
  return <>

    <h1 className=' text-orange-600 text-2xl my-7  ml-5 font-bold  '><i className="fa-solid fa-shirt "></i> OUR PRODUCTS</h1>
    <div className=' m-auto'>
    <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5'>
    {
      productList.map((product) => {
        return <ProductCard key={product._id} product={product} />
      })
    }
    </div>
    </div>





  
  </>
}

