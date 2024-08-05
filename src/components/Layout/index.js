import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Image from 'next/image';
import Background from '../../../public/bgpage.png';
import BackgroundHome from '../../../public/bghome.png';

export default function Layout({ children }) {
    const router = useRouter();
    const isAuthRoute = router.pathname.includes("auth");
    const isHomePage = router.pathname === "/";

    return (
        <div className='bg-blue-gray-50'>
            {isHomePage || isAuthRoute ? (
                <div className='bg-white min-h-screen'>{children}</div>
            ) : (
                <div className='w-full relative min-h-screen'>
                    {router.pathname === '/home' ? (
                        <Image 
                            src={BackgroundHome} 
                            alt="Background Home" 
                            layout="fill" 
                            objectFit="cover" 
                            className='z-0' 
                        />
                    ) : (
                        <Image 
                            src={Background} 
                            alt="Background" 
                            layout="fill" 
                            objectFit="cover" 
                            className='z-0' 
                        />
                    )}

                    <div className='relative z-10'>
                        <Navbar />
                        <div className='px-4 md:px-8 lg:px-12 pt-10 pb-2 min-h-screen'>
                            {children}
                        </div>
                        <Footer />
                    </div>
                </div>
            )}
        </div>
    )
}
