'use client'

import { AddToWishList } from "@/app/WishListAction/WishListAction"
import { Button } from "@/components/ui/button"



export default function AddWishBtn({id}:{id:string}) {


    return <>
        <Button onClick={()=>{AddToWishList(id)}} className="bg-transparent hover:bg-transparent" ><i className="fa-solid fa-heart text-gray-400 text-2xl hover:text-red-500 cursor-pointer "></i></Button>
    </>
}