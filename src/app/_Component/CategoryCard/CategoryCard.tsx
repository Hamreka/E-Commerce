import React from 'react'
import Image from 'next/image';
import { categ } from '@/types/categoriesData.type';


export default function CategoryCard({ categ }: { categ:categ }) {
const {_id,createdAt,image,name,slug,updatedAt }=categ
    return <>
        
        <div className=' border-1 border-orange-500 rounded-none hover:shadow-md hover:shadow-orange-500  transition-shadow duration-500 cursor-pointer text-center  dark:bg-white dark:border-white dark:hover:shadow-white '>
            <span className='absolute z-10 font-bold  bg-orange-500  flex  '>{name}</span>
            <Image src={categ.image} alt={categ.name} width={100} height={100} className='relative w-full h-full opject-cover' />
        </div>


    
    
    
    </>
}
