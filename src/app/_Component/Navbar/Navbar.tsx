"use client"

import {useContext} from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { signOut, useSession } from "next-auth/react"

import { CountContext } from "@/CountProvider"


export function Navbar() {
  const CountData = useContext(CountContext)
  const {data,status} = useSession()
  console.log(data);
  
  const MenuItems: { path: string, content: string , protected:boolean}[] = [
    {path:"/brands", content:"Brands" , protected:false},
    {path:"/products", content:"Products" , protected:false},
    { path: "/categories", content: "Categories", protected:false },
    {path:"/wishlist", content:"Wishlist", protected:true},
    {path:"/allorders", content:"Orders", protected:true},
   
  ]
   const MenuAuthItems: { path: string, content: string }[] = [
    {path:"/login", content:"Login"},
    {path:"/register", content:"Register"},
   
  ]
  const MenuCartItems: { path: string, content: string }[] = [
    {path:"/cart", content:"Cart"},
 
    
  ]
  function logout() {
    signOut({
      callbackUrl:'/login'
    })
  }
  return (
    <NavigationMenu viewport={false} className=" list-none  max-w-full justify-between px-20 py-6 border-b-1 border-gray-300">
      <NavigationMenuItem>
                      <Link href={'./'} className="uppercase "><h1 className="text-2xl font-bold">Exclusive</h1></Link>
            </NavigationMenuItem>
      <NavigationMenuList>  
        {
          MenuItems.map((item) => {
            return<NavigationMenuItem key={item.path}>
                   {item.protected && status== 'authenticated' &&  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href={item.path}>{item.content}</Link>
              </NavigationMenuLink>}
              {!item.protected &&  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href={item.path}>{item.content}</Link>
                    </NavigationMenuLink>}
            </NavigationMenuItem>
          })
       }
      </NavigationMenuList>
      <NavigationMenuList>  
        {status == "authenticated" ? <>
          {
         
          <NavigationMenuItem>
                <NavigationMenuLink asChild className={(navigationMenuTriggerStyle())}>
                <Link href={'/cart'} className="relative">
                  {CountData?.count == 0 ? '' : <span className=" absolute -top-0.5 left-0.5 bg-orange-400 w-4 h-4 rounded-full flex justify-center items-center pt-0.5 ">{CountData?.count}</span>}
                  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="#000000" d="M0 1h4.764l.545 2h18.078l-3.666 11H7.78l-.5 2H22v2H4.72l1.246-4.989L3.236 3H0V1Zm7.764 11h10.515l2.334-7H5.855l1.909 7ZM4 21a2 2 0 1 1 4 0a2 2 0 0 1-4 0Zm14 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0Z" /></svg></Link>
                      
                    </NavigationMenuLink>
            </NavigationMenuItem>
              
         
          }
          <NavigationMenuItem>
                      <span>hello {data?.user.name} <i className="fa-light fa-arrow-right-from-bracket text-black"></i></span>
            </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>
            <span onClick={logout}>Logout <i className="fa-light fa-arrow-right-from-bracket text-black"></i></span>
            </NavigationMenuLink>
            </NavigationMenuItem>
        
        </> :<>
           {
          MenuAuthItems.map((item) => {
            return<NavigationMenuItem key={item.path}>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href={item.path}>{item.content}</Link>
                    </NavigationMenuLink>
            </NavigationMenuItem>
          })
        }
        </> }
        
       
      </NavigationMenuList>
    </NavigationMenu>
  )
}

