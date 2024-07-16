import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function Layout({ children }) {
    const router = useRouter();
    const isAuthRoute = router.pathname.includes("auth");
    const isHomePage = router.pathname === "/";
    
    return (
        <div className='min-h-screen bg-blue-gray-50 w-full'>
            {isHomePage ? (
                <div className='bg-slate-200'>{children}</div>
            ) : isAuthRoute ? (
                <div className='bg-slate-200'>{children}</div>
            ) : (
                <div className='w-full'>
                    <div className='flex items-center justify-center'>
                        <Navbar />
                    </div>
                    <div className='bg-slate-200 px-12 pt-10 pb-2 min-h-screen'>
                        {children}
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}
