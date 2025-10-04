import React from 'react'
import Image from 'next/image';
import { brands } from '@/types/brands.type';

export default function BrandsCard({ brands }: { brands:brands }) {
const {_id, name , image}=brands
    return <><div className=' border-1 border-orange-500 rounded-none hover:shadow-md hover:shadow-orange-500  transition-shadow duration-500 cursor-pointer text-center dark:bg-white dark:border-white dark:hover:shadow-white'>
            <Image src={brands.image} alt={brands.name} width={100} height={100} className='w-full  opject-cover'/>
            <h1 className="font-normal text-gray-700 dark:text-gray-400">{ brands.name}</h1>
        </div>


    
    
    
    </>
}
