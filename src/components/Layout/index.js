import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Image from 'next/image';
import Background from '../../../public/bgpage.png'

export default function Layout({ children }) {
    const router = useRouter();
    const isAuthRoute = router.pathname.includes("auth");
    const isHomePage = router.pathname === "/";
    
    return (
        <div className=' bg-blue-gray-50 '>
            {isHomePage ? (
                <div className='bg-white'>{children}</div>
            ) : isAuthRoute ? (
                <div className='bg-white'>{children}</div>
            ) : (
                <div className='w-full relative min-h-screen'>
    <Image src={Background} alt="Background Login" layout="fill" objectFit="cover" className='z-0' />

    <div className='relative z-10'>
        <Navbar />
        <div className=' px-12 pt-10 pb-2 min-h-screen'>
            {children}
        </div>
        <Footer />
    </div>
</div>

            )}
        </div>
    )
}
