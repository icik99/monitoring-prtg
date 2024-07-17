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
        header: 'Nomor',
        cell: (row) => (
          <h1>
            {parseInt(row.row.id) + 1}
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
                <h1 className='mb-6 text-5xl font-bold'>Akses Poin Gedung Manterawu</h1>
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