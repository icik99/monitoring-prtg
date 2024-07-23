import React from 'react'
import aboutus from "../../../public/aboutus.png";
import Image from 'next/image';


export default function AboutUs() {
  return (
    <div>
        <div>
            <h1 className='font-semibold text-2xl text-justify px-56'>Tujuan utama dari website FacultyNet Monitoring adalah untuk menyediakan website yang efektif dalam memantau dan mengelola jaringan WiFi di lingkungan kampus Telkom University. Dengan bantuan dari Pusat Teknologi Informasi (PuTI) Telkom University dan dukungan bimbingan dari dua dosen pembimbing kami, website ini dirancang untuk memastikan kualitas koneksi yang optimal, memberikan informasi real-time tentang status jaringan, serta memfasilitasi analisis dan pemecahan masalah. Kami berkomitmen untuk meningkatkan pengalaman koneksi internet di kampus dengan teknologi yang andal dan solusi yang inovatif.</h1>
        </div>
        <div className='flex items-center justify-center mt-10'>
            <Image src={aboutus} width={760} height={760} />
        </div>
    </div>
  )
}
