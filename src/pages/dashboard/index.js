import React, { useEffect, useMemo, useState } from 'react';
import { MdRouter, MdWifi } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { withSession } from '@/utils/sessionWrapper';
import ClientRequest from '@/utils/clientApiService';
import routeGuard from '@/utils/routeGuard';

export default function Dashboard({countDashboard, accessToken}) {

  const [dataGrafik1, setDataGrafik1] = useState()
  const [dataGrafik2, setDataGrafik2] = useState()
  const [dataGrafik3, setDataGrafik3] = useState()
  const [dataGrafik4, setDataGrafik4] = useState()

  const getDataGrafik = async () => {
      try {
        const resGrafik1 = await ClientRequest.GetBandwith('2160', accessToken) // snmp manterawu
        const resGrafik2 = await ClientRequest.GetBandwith('2140', accessToken) // snmp fkb
        const resGrafik3 = await ClientRequest.GetBandwith('2192', accessToken) // ping feb
        const resGrafik4 = await ClientRequest.GetBandwith('2190', accessToken) // jitter feb
        setDataGrafik1(resGrafik1.data)
        setDataGrafik2(resGrafik2.data)
        setDataGrafik3(resGrafik3.data)
        setDataGrafik4(resGrafik4.data)
      } catch (error) {
        console.log(error)
      }
  }



  //Kode Untuk Eksekusi Fungsi ketika halaman pertama kali di load
  useEffect(() => {
    getDataGrafik()
  }, []) // kurung siku kosong, untuk memastikan fungsinya cuma di eksekusi satu kali.

  return (
    <div className=''>
  <div className='flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-9'>
    <div className="w-full lg:w-[full] border-b-[#b6252a] border-b-[15px] h-[160px] rounded-lg border p-[20px] lg:p-[30px] bg-white shadow">
      <div className="flex items-center h-full justify-between gap-3">
        <div className='flex items-center justify-center gap-3'>
          <MdWifi className='text-4xl lg:text-5xl text-[#b6252a]'/>
          <h1 className="font-bold text-xl lg:text-2xl">Akses Poin Terhubung</h1>
        </div>
        <h1 className="font-bold text-4xl lg:text-5xl">{countDashboard.countRouter}</h1>
      </div>
    </div>
  </div>
  <section className='mt-10'>
    <div className='flex flex-col lg:flex-row items-center gap-5 lg:mb-3'>
      <div className='w-full'>
        <h1 className='font-semibold text-white bg-red-800 rounded-lg p-2 mb-4 text-center lg:text-left'>Grafik Bandwidth</h1>
        <div dangerouslySetInnerHTML={{ __html: dataGrafik1 }} />
      </div>
      <div className='w-full'>
        <h1 className='font-semibold bg-red-800 p-2 rounded-lg text-white mb-4 text-center lg:text-left'>Grafik Bandwidth</h1>
        <div dangerouslySetInnerHTML={{ __html: dataGrafik2 }} />
      </div>
    </div>
    <div className='flex flex-col lg:flex-row items-center gap-5'>
      <div className='w-full'>
        <h1 className='font-semibold bg-red-800 p-2 rounded-lg text-white mb-4 text-center lg:text-left'>Grafik Ping</h1>
        <div dangerouslySetInnerHTML={{ __html: dataGrafik3 }} />
      </div>
      <div className='w-full'>
        <h1 className='font-semibold bg-red-800 p-2 rounded-lg text-white mb-4 text-center lg:text-left'>Grafik Jitter</h1>
        <div dangerouslySetInnerHTML={{ __html: dataGrafik4 }} />
      </div>
    </div>
  </section>
</div>

  );
}


export const getServerSideProps = withSession(async ({ req }) => {
  const accessToken = req.session?.auth?.access_token;
  const isLoggedIn = !!accessToken;

  if (!isLoggedIn) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  } else{
    const res = await ClientRequest.CountDashboard(accessToken)
    return {
      props: {
        countDashboard: res.data.data,
        accessToken
      },
    };
  }
});