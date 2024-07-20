import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function Layout({ children }) {
    const router = useRouter();
    const isAuthRoute = router.pathname.includes("auth");
    const isHomePage = router.pathname === "/";
    
    return (
        <div className=' bg-blue-gray-50 '>
            {isHomePage ? (
                <div className='bg-slate-200'>{children}</div>
            ) : isAuthRoute ? (
                <div className='bg-slate-200'>{children}</div>
            ) : (
                <div className='w-full'>
                    <Navbar />
                    <div className='bg-slate-200 px-12 pt-10 pb-2 min-h-screen'>
                        {children}
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}
