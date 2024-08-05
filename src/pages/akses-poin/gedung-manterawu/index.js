import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/Tabel';

import Link from 'next/link';
import { withSession } from '@/utils/sessionWrapper';
import routeGuard from '@/utils/routeGuard';
import ClientRequest from '@/utils/clientApiService';
import axios from 'axios';



export default function AksesPoinManterawu({accessToken}) {
  const [data, setData] = useState([]);

  const getDataAksesPoin = async () => {
    try {
      const res = await axios.get('../dataAksesPoin.json')
      setData(res.data.MANTERAWU)
    } catch (error) {
      
    }
  }


  
  const kolomGedungManterawu = [
      {
        header: 'No.',
        cell: (row) => (
          <h1>
            {parseInt(row.row.id) + 1}.
          </h1>
        )
      },
      {
        accessorKey: "SSID",
        header: "SSID",
      },
      {
        accessorKey: "IP",
        header: "IP Address",
      },
      {
        accessorKey: "MAC",
        header: "MAC ID",
      },
      {
        accessorKey: "Type",
        header: "Tipe",
      },
      {
        accessorKey: "Throughput",
        header: "Troughput",
      },
      {
        accessorKey: "Location",
        header: "Lokasi",
      },
  ];

  useEffect(() => {
    getDataAksesPoin()
  }, []);

    return (
        <div className='space-y-11 pb-10'>
            <div className=''>
                <div className='flex items-center justify-center'>
                  <h1 className='mb-6 text-xl lg:text-3xl font-bold bg-gradient-to-r from-red-800 to-red-700 text-white py-2 lg:py-3 px-4 lg:px-5 w-fit rounded-lg'>
                    Akses Poin Gedung Manterawu
                  </h1>
                </div>
                <DataTable columns={kolomGedungManterawu} data={data} />
            </div>
        </div>
    );
}


export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {
      accessToken
    }
	})
})