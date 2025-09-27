'use client'

import { AddProToCart } from "@/app/CartAction/CartAction"
import { Button } from "@/components/ui/button"
import { CountContext } from "@/CountProvider"
import { useContext } from "react"
import { toast } from "sonner"

export default function AddCartBtn({ id }: { id: string }) {
     const CountData = useContext(CountContext)
    async function AddProToCartBridge(id: string) {
        const data = await AddProToCart(id)
        if (data.status == 'success') {
            toast.success(data.message, { position: "top-center" })
             const sum = data.data.products.reduce((total: number, item: { count: number }) => total += item.count, 0)
           CountData?.setCount(sum)
        } else {
            toast.error('field to add product')
        }
        
    }

    return (
        <Button onClick={()=>{AddProToCartBridge(id)}} className=" bg-black w-full rounded-none cursor-pointer">Add To Cart</Button>
    )
}