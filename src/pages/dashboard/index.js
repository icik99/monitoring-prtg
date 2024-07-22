import React, { useEffect, useMemo, useState } from 'react';
import { MdRouter, MdWifi } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import dynamic from 'next/dynamic';
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
        const resGrafik4 = await ClientRequest.GetBandwith('2186', accessToken)
        setDataGrafik1(resGrafik1.data)
        setDataGrafik2(resGrafik2.data)
        setDataGrafik3(resGrafik3.data)
        setDataGrafik4(resGrafik4.data)
      } catch (error) {
        console.log(error)
      }
  }

  const LeafletMap = useMemo(() => dynamic(
    () => import('@/components/LeafletMap'),
    { 
        loading: () => <p>A map is loading</p>,
        ssr: false
    }
  ), []);

  useEffect(() => {
    getDataGrafik()
  }, [])

  return (
    <div className=''>
      <div className='flex items-center justify-center gap-9'>
        <div className="lg:w-[full] w-full border-b-[#b6252a] border-b-[15px] h-[160px] rounded-lg border p-[30px] bg-white shadow">
          <div className="flex items-center h-full justify-between gap-3">
            <div className='flex items-center justify-center gap-3'>
              <MdWifi className='text-5xl text-[#b6252a]'/>
              <h1 className="font-bold text-2xl">Akses Poin Terhubung</h1>
            </div>
            <h1 className="font-bold text-5xl">{countDashboard.countRouter}</h1>
          </div>
        </div>
      </div>
      <section className='mt-10'>
        {/* <h1 className='font-bold text-5xl mb-2 p-2'>Lokasi Server:</h1>
        <div className='shadow-lg mb-40 border'>
          <LeafletMap />
        </div> */}
        <div className='flex items-center gap-5 mb-3'>
          <div className='w-full'>
            <h1 className='font-semibold bg-red-800 p-2 rounded-lg text-white mb-4 '>Gedung Manterawu</h1>
            <div dangerouslySetInnerHTML={{ __html: dataGrafik1 }} />
          </div>
          <div className='w-full'>
            <h1 className='font-semibold bg-red-800 p-2 rounded-lg text-white mb-4 '>Gedung FKB</h1>
            <div dangerouslySetInnerHTML={{ __html: dataGrafik2 }} />
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <div className='w-full'>
            <h1 className='font-semibold bg-red-800 p-2 rounded-lg text-white mb-4 '>Gedung FEB</h1>
            <div dangerouslySetInnerHTML={{ __html: dataGrafik3 }} />
          </div>
          <div className='w-full pt-10'>
            {/* <h1 className='font-semibold bg-red-800 p-2 rounded-lg text-white '></h1> */}
            <div dangerouslySetInnerHTML={{ __html: dataGrafik4 }} />
          </div>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
  const res = await ClientRequest.CountDashboard(accessToken)
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {
        countDashboard: res.data.data,
        accessToken
    }
	})
})