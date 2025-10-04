"use client"

import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { CountContext } from "@/CountProvider"

export function Navbar() {
  const [checked, setChecked] = useState(false)
  const [isOpen, setIsOpen] = useState(false) 
  const CountData = useContext(CountContext)
  const { data, status } = useSession()

  useEffect(() => {
    if (checked) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [checked])

  const MenuItems: { path: string; content: string; protected: boolean }[] = [
    { path: "/brands", content: "Brands", protected: false },
    { path: "/products", content: "Products", protected: false },
    { path: "/categories", content: "Categories", protected: false },
    { path: "/wishlist", content: "Wishlist", protected: true },
    { path: "/allorders", content: "Orders", protected: true },
  ]

  const MenuAuthItems: { path: string; content: string }[] = [
    { path: "/login", content: "Login" },
    { path: "/register", content: "Register" },
  ]

  function logout() {
    signOut({
      callbackUrl: "/login",
    })
  }

  return (
    <nav className="border-b border-gray-300 dark:bg-gray-800">
      <div className="flex justify-between items-center px-4 md:px-20 py-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Switch checked={checked} onCheckedChange={setChecked} />
          <Link href={"/"} className="uppercase">
            <h1 className="text-2xl font-bold">Exclusive</h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:flex space-x-6">
          <NavigationMenuList>
            {MenuItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                {item.protected && status === "authenticated" ? (
                  <NavigationMenuLink asChild className="dark:bg-transparent dark:hover:bg-gray-600">
                    <Link href={item.path}>{item.content}</Link>
                  </NavigationMenuLink>
                ) : !item.protected ? (
                  <NavigationMenuLink asChild className="dark:bg-transparent dark:hover:bg-gray-600">
                    <Link href={item.path}>{item.content}</Link>
                  </NavigationMenuLink>
                ) : null}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Right Section */}
        <NavigationMenu className="hidden md:flex space-x-6">
          <NavigationMenuList>
            {status === "authenticated" ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href={"/cart"} className="relative">
                      {CountData.count > 0 && (
                        <span className="absolute -top-1 -left-1 bg-orange-400 w-4 h-4 rounded-full flex justify-center items-center text-xs">
                          {CountData?.count}
                        </span>
                      )}
                      <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-xl dark:hover:bg-gray-700">
                      hello {data?.user.name}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <span onClick={logout}>
                          Logout <i className="fa-solid fa-right-from-bracket"></i>
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              </>
            ) : (
              MenuAuthItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={item.path}>{item.content}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Hamburger for Mobile */}
        <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <i className="fa-solid fa-xmark text-2xl"></i>
          ) : (
            <i className="fa-solid fa-bars text-2xl"></i>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-900 px-4 py-4 space-y-2">
          {MenuItems.map((item) => (
            <div key={item.path}>
              {item.protected && status !== "authenticated" ? null : (
                <Link
                  href={item.path}
                  className="block py-2 px-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                >
                  {item.content}
                </Link>
              )}
            </div>
          ))}

          {status === "authenticated" ? (
            <>
              <Link
                href="/cart"
                className="block py-2 px-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
              >
                Cart ({CountData?.count || 0})
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left py-2 px-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            MenuAuthItems.map((item) => (
              <div key={item.path}>
                <Link
                  href={item.path}
                  className="block py-2 px-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                >
                  {item.content}
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </nav>
  )
}