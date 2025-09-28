import { Button } from '@/components/ui/button'
import React from 'react'

export default function Footer() {
  return (
    <footer className="relative top-100 bg-blue-50 pt-8 pb-6">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap text-left lg:text-left">
      <div className="w-full lg:w-6/12 px-4 m-auto text-center">
        <h4 className="text-3xl fonat-semibold text-blueGray-700">Lets keep in touch!</h4>
        <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
          Find us on any of these platforms.
        </h5>
        <div className="mt-6 lg:mb-0 mb-6">
          <Button className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <i className="fab fa-twitter" />
          </Button>
          <Button className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <i className="fab fa-facebook-square" />
          </Button>
          <Button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <i className="fab fa-dribbble" />
            </Button>
             
        </div>
      </div>
   
    </div>
    <hr className="my-6 border-blue-100" />
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1">
          Copyright-2025 © By AmrMaziedBadawi
        </div>
      </div>
    </div>
  </div>
</footer>

  )
}
