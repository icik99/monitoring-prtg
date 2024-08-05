import React, { useMemo, useState } from 'react'
import dynamic from 'next/dynamic';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';


export default function ContactUs() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pesan, setPesan] = useState('')

    const sendToEmail = async (e) => {
        e.preventDefault();

        try {
            const templateParams = {
                to_name: 'Abdi', // ganti dengan nama penerima atau tambahkan input untuk nama penerima
                from_name: name,
                message: pesan,
                reply_to: email, // jika Anda ingin menambahkan balasan email
            };

            await emailjs.send(
                'service_3lkpu98',  // Ganti dengan Service ID yang Anda dapatkan
                'template_9hqwkmt', // Ganti dengan Template ID yang Anda dapatkan
                templateParams,
                'Ka2jmoT8afvo2NXyw'      // Ganti dengan User ID yang Anda dapatkan
            );

            toast.success('Email berhasil dikirim!');
            setName('');
            setEmail('');
            setPesan('');
        } catch (error) {
            console.log('Error:', error);
            toast.error('Gagal mengirim email. Silakan coba lagi.');
        }
    };

    const LeafletMap = useMemo(() => dynamic(
        () => import('@/components/LeafletMap'),
        { 
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), []);

    return (
        <div className='pb-10 px-4'>
            <h1 className='text-center text-2xl lg:text-3xl font-medium mb-10'>
                Jika ada masalah pada website ini atau Anda ingin berdiskusi, memberikan saran, <br className='hidden lg:block' />dan memperoleh informasi tambahan, segera hubungi kami di bawah ini.
            </h1>
            <div className='flex flex-col lg:flex-row items-center gap-10 justify-between'>
                <div className='w-full lg:w-[45%] bg-white shadow-lg rounded-lg px-6 py-4'>
                    <h1 className='font-bold text-xl mb-2'>Lokasi Server:</h1>
                    <div className='shadow-lg mb-3 border rounded-xl'>
                        <LeafletMap />
                    </div>
                </div>
                <div className='p-4 rounded-lg border bg-white w-full lg:w-[50%] shadow-xl space-y-4'>
                    <div>
                        <h1 className='mb-2 font-semibold'>Nama: </h1>
                        <input onChange={(e) => setName(e.target.value)} type="text" className='w-full p-2 border-2 rounded-lg outline-none' placeholder='Nama...' />
                    </div>
                    <div>
                        <h1 className='mb-2 font-semibold'>Email: </h1>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" className='w-full p-2 border-2 rounded-lg outline-none' placeholder='Email...' />
                    </div>
                    <div>
                        <h1 className='mb-2 font-semibold'>Pesan: </h1>
                        <textarea onChange={(e) => setPesan(e.target.value)} type="text" className='w-full p-2 border-2 rounded-lg outline-none' placeholder='Pesan...' />
                    </div>
                    <div className='flex justify-end'>
                        <button onClick={sendToEmail} className='bg-red-800 font-semibold text-white py-2 px-5 rounded-lg'>Kirim</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
