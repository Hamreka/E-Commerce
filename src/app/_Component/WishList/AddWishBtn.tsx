'use client'

import { useEffect, useState } from "react"
import { getWishData, AddToWishList, RemoveProWish } from "@/app/WishListAction/WishListAction"
import { Button } from "@/components/ui/button"

export default function AddWishBtn({ id }: { id: string }) {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishData()
        setWishlist(data.data.map((item) => item._id || item.id))
      } catch (err) {
        console.log("Not logged in or error:", err)
      }
    }
    fetchWishlist()
  }, [])


  const isActive = wishlist.includes(id)

  const handleToggle = async () => {
    setLoading(true)
    try {
      if (isActive) {

        await RemoveProWish(id)
        setWishlist(prev => prev.filter(itemId => itemId !== id))
      } else {

        await AddToWishList(id)
        setWishlist(prev => [...prev, id])
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <Button
      disabled={loading}
      onClick={handleToggle}
      className="bg-transparent hover:bg-transparent"
    >
      <i
        className={`fa-solid fa-heart text-2xl transition-colors ${
          isActive ? "text-red-500" : "text-gray-400"
        }`}
      />
    </Button>
  )
}