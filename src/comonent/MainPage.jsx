import React from 'react'
import Navbar from './Navbar'
import Center from './Center'
import Footer from './Footer'

const MainPage = () => {
  return (
    <div className='min-h-screen bg-linear-to-r from-green-100 via-green-100 to-gray-200 md:px-5 p-2'>
      <Navbar/>
      <Center />
      <Footer />
    </div>
  )
}

export default MainPage
