'use server'

import { getUserToken } from "@/getUserToken"
    
export async function CheckOutPayment(cartid: string, shippingData:{ details:string, city:string, phone:string }) {
    const token = await getUserToken()
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartid}?url=${process.env.NEXT_URL}`, {
            method: 'post',
            body: JSON.stringify({
                "shippingAddress": shippingData
            }),
            headers: {
                token: token as string,
                'content-type':'application/json'
            }
        })
        const data = await res.json()
        return data
    }
}
