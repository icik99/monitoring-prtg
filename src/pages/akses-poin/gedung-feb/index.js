import { useState, useEffect } from 'react';
import { withSession } from '@/utils/sessionWrapper';
import routeGuard from '@/utils/routeGuard';
import axios from 'axios';
import DataTable from '@/components/Tabel';



export default function AksesPoinFEB({accessToken}) {
  const [data, setData] = useState([]);

  const getDataAksesPoin = async () => {
    try {
      const res = await axios.get('../dataAksesPoin.json')
      setData(res.data.FEB)
    } catch (error) {
      
    }
  }
  
  const kolomGedungFEB = [
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
                <h1 className='mb-6 text-3xl font-bold'>Akses Poin Gedung FEB</h1>
                <DataTable columns={kolomGedungFEB} data={data} />
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