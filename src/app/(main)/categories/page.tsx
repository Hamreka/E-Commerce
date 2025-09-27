import { getServerSession } from 'next-auth'
import React from 'react'
import { NextOptions } from '@/app/api/auth/[...nextauth]/route'
import { CategoriesData, categ } from '@/types/categoriesData.type';
import CategoryCard from '@/app/_Component/CategoryCard/CategoryCard';

export default async function page() {
  const data = await getServerSession(NextOptions)
  console.log(data?.user);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`)
    const Catdata: CategoriesData = await res.json()
    const CategList:categ[] =Catdata.data
  
  return <>
    <h1 className=' text-orange-600 text-2xl my-7  ml-5 font-bold  '><i className="fa-solid fa-icons"></i> CATEGORIES</h1>
    <div className='w-5/6 m-auto'>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
        {
          CategList.map((categ) => {
            return <CategoryCard key={categ._id} categ={categ} />
          })
        }
      </div>
    </div>
      
  
  
  </>
   
}
