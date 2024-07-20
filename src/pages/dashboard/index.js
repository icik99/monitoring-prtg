import React, { useMemo } from 'react';
import { MdRouter, MdWifi } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import dynamic from 'next/dynamic';
import { withSession } from '@/utils/sessionWrapper';
import ClientRequest from '@/utils/clientApiService';
import routeGuard from '@/utils/routeGuard';

export default function Dashboard({countDashboard}) {

  const LeafletMap = useMemo(() => dynamic(
    () => import('@/components/LeafletMap'),
    { 
        loading: () => <p>A map is loading</p>,
        ssr: false
    }
  ), []);

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
        <h1 className='font-bold text-5xl mb-2 p-2'>Lokasi Server:</h1>
        <div className='shadow-lg mb-40 border'>
          <LeafletMap />
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
        countDashboard: res.data.data
    }
	})
})