'use client'
import { createContext, useEffect, useState } from "react";
import { getUserToken } from "./getUserToken";
import { getCartData } from "./app/CartAction/CartAction";
import { CartData } from "./types/cart.type";
type ContextType = {
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>
}
export const CountContext = createContext<ContextType | null>(null)

export default function CountProvider({ children }: {children :React.ReactNode}) {
    const [count, setCount] = useState<number>(0)
    

    async function getCartCount() {
        const token = await getUserToken()
       if(token){
           const data: CartData = await getCartData()
           console.log(token);
           
           
           const sum = data.data.products.reduce((total, item) => total += item.count, 0)
           setCount(sum)
      
        
       }
        
    }
    useEffect(() => {
        getCartCount()
        
    })
    
    return <CountContext.Provider value={{count , setCount}}>
    
    {children}
    
    </CountContext.Provider>
}