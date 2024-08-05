import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center w-full px-4 py-12'>
      <div className='text-center'>
        <div className='font-bold text-2xl md:text-3xl lg:text-4xl mb-4 pt-80'>
          <h1>Selamat Datang di FacultyNet Monitoring</h1>
          <h1>Pantau Koneksi WiFi dengan Mudah dan Efisien</h1>
        </div>
        <div className='text-lg md:text-xl lg:text-2xl'>
          <h1>FacultyNet Monitoring memberikan solusi untuk memantau jaringan WiFi. Memastikan kualitas koneksi tetap optimal</h1>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 mt-10 lg:mt-20'>
          <Link className='bg-red-800 font-bold p-3 rounded-lg text-white text-lg md:text-xl lg:text-2xl text-center w-40 md:w-48 lg:w-56' href='/about-us'>
              About Us
          </Link>
          <Link className='bg-red-800 font-bold p-3 rounded-lg text-white text-lg md:text-xl lg:text-2xl text-center w-40 md:w-48 lg:w-56' href='/contact-us'>
              Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
