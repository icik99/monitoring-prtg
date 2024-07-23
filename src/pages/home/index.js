import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function Home() {
  return (
    <>
      <div className='min-h-screen flex items-center justify-center w-full pt-72'>
        <div>
          <div className='font-bold text-4xl mb-4'>
            <h1 className='text-center'>Selamat Datang di FacultyNet Monitoring</h1>
            <h1 className='text-center'>Pantau Koneksi WiFi dengan Mudah dan Efisien</h1>
          </div>
          <div className='text-2xl'>
            <h1>FacultyNet Monitoring memberikan solusi untuk memantau jaringan WiFi. Memastikan kualitas koneksi tetap optimal</h1>
          </div>
          <div className='flex items-center justify-center gap-[500px] mt-20'>
            <Link href={'/about-us'} className='bg-red-800 font-bold p-3 rounded-lg text-white text-3xl'>About Us</Link>
            <Link href={'/contact-us'} className='bg-red-800 font-bold p-3 rounded-lg text-white text-3xl'>Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  )
}
