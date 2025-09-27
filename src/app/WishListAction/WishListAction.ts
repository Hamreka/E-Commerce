'use server'

import { getUserToken } from "@/getUserToken"
import { WishData } from "@/types/wishlist.type"




export async function getWishData() {
    const token = await getUserToken()
    if (!token) {
        throw new Error('token needed')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        headers: {
            token:token as string
        }}
    )
    const data:WishData = await res.json()
    return data
    
}



export async function AddToWishList(id: string) {
        const token = await getUserToken()
    if (!token) {
        throw new Error('token needed')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        method: 'post',
        body: JSON.stringify({
            productId:id
        }),
        headers: {
            token: token as string,
            'content-type':'application/json'
        }
    })
    const data = await res.json()
    return data
    
}
export async function RemoveProWish(id: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error('token needed')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`, {
        method: 'delete',
        headers: {
            token:token as string
        }
    })
    const data = await res.json()
    return data



}