import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Logo from '../../../public/logo.png';
import toast from 'react-hot-toast';
import { IoIosWifi } from "react-icons/io";
import axios from 'axios';
import Link from 'next/link';

export default function Navbar() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const Logout = async () => {
        toast.promise(
          axios.request({
            method: 'POST',
            url: '/api/logout'
          }), {
            loading: 'Sedang melakukan logout...',
            success: (res) => {
              router.push('/auth/login');
              return res.data?.message || 'Logout berhasil';
            },
            error: (err) => {
              return err.data?.message || 'Terjadi kesalahan';
            }
          }
        );
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="border-b-2 w-full px-8 py-3 bg-[#b6252a]">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="border-4 bg-red-600 rounded-xl p-2">
                        <IoIosWifi className="text-4xl text-white" />
                    </div>
                </div>
                <div className="hidden md:flex space-x-6">
                    <Link href="/home" className="text-white text-md">Home</Link>
                    <Link href="/dashboard" className="text-white text-md">Dashboard</Link>
                    <div className="relative group">
                        <button className="text-white text-md">Akses Poin Tersedia</button>
                        <div className="absolute hidden group-hover:block bg-white text-black rounded-md shadow-md mt-2 p-4 w-[200px] space-y-2">
                            <Link href="/akses-poin/gedung-feb" className="block py-1 px-1 ">Gedung FEB</Link>
                            <Link href="/akses-poin/gedung-fkb" className="block py-1 px-1 ">Gedung FKB</Link>
                            <Link href="/akses-poin/gedung-manterawu" className="block py-1 px-1 ">Gedung Manterawu</Link>
                        </div>
                    </div>
                    <div className="relative group">
                        <button className="text-white text-md">Monitoring Jaringan</button>
                        <div className="absolute hidden group-hover:block bg-white text-black rounded-md shadow-md mt-2 p-4  w-[200px] space-y-2">
                            <Link href="/monitoring/gedung-feb" className="block py-1 px-1 ">Gedung FEB</Link>
                            <Link href="/monitoring/gedung-fkb" className="block py-1 px-1 ">Gedung FKB</Link>
                            <Link href="/monitoring/gedung-manterawu" className="block py-1 px-1 ">Gedung Manterawu</Link>
                        </div>
                    </div>
                    <div className="relative group">
                        <button className="text-white text-md">Grafik Jaringan</button>
                        <div className="absolute hidden group-hover:block bg-white text-black rounded-md shadow-md mt-2 p-4  w-[200px] space-y-2">
                            <Link href="/grafik/gedung-feb" className="block py-1 px-1 ">Gedung FEB</Link>
                            <Link href="/grafik/gedung-fkb" className="block py-1 px-1 ">Gedung FKB</Link>
                            <Link href="/grafik/gedung-manterawu" className="block py-1 px-1 ">Gedung Manterawu</Link>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex">
                    <button onClick={Logout} className="text-white text-md font-bold underline">
                        Logout
                    </button>
                </div>
                <div className="md:hidden flex items-center">
                    <button className="text-white focus:outline-none" onClick={toggleMenu}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`md:hidden mt-4 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-menu">
                <Link href="/home" className="block text-white text-md py-2">Home</Link>
                <Link href="/dashboard" className="block text-white text-md py-2">Dashboard</Link>
                <Link href="/akses-poin/gedung-feb" className="block text-white text-md py-2">Akses Poin Gedung FEB</Link>
                <Link href="/akses-poin/gedung-fkb" className="block text-white text-md py-2">Akses Poin Gedung FKB</Link>
                <Link href="/akses-poin/gedung-manterawu" className="block text-white text-md py-2">Akses Poin Gedung Manterawu</Link>
                <Link href="/monitoring/gedung-feb" className="block text-white text-md py-2">Monitoring Gedung FEB</Link>
                <Link href="/monitoring/gedung-fkb" className="block text-white text-md py-2">Monitoring Gedung FKB</Link>
                <Link href="/monitoring/gedung-manterawu" className="block text-white text-md py-2">Monitoring Gedung Manterawu</Link>
                <Link href="/grafik/gedung-feb" className="block text-white text-md py-2">Grafik Gedung FEB</Link>
                <Link href="/grafik/gedung-fkb" className="block text-white text-md py-2">Grafik Gedung FKB</Link>
                <Link href="/grafik/gedung-manterawu" className="block text-white text-md py-2">Grafik Gedung Manterawu</Link>
                <button onClick={Logout} className="block text-white text-md py-2 font-bold underline">Logout</button>
            </div>
        </div>
    );
}
