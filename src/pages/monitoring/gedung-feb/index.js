import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/Tabel';
import Link from 'next/link';
import { withSession } from '@/utils/sessionWrapper';
import routeGuard from '@/utils/routeGuard';
import ClientRequest from '@/utils/clientApiService';

export default function MonitoringFEB({accessToken}) {
    const [data, setData] = useState([]);

    const getSensor = async () => {
      try {
          const res = await ClientRequest.GetDataMonitoring(accessToken) 
          setData(res.data.data)
          console.log(res.data.data)
      } catch (error) {
          console.log(error)
      }
  }
  
  const columns = [
      {
        header: 'No.',
        cell: (row) => (
          <h1>
            {parseInt(row.row.id) + 1}.
          </h1>
        )
      },
      {
        accessorKey: "ssid",
        header: "SSID",
      },
      {
        accessorKey: "kecepatanDownload",
        header: "Kecepatan Download",
      },
      {
        accessorKey: "kecepatanUpload",
        header: "Kecepatan Upload",
      },
      {
        accessorKey: "ping",
        header: "Ping",
      },
      {
        accessorKey: "jitter",
        header: "Jitter",
      },
      {
        accessorKey: "presentaseKekuatanSinyal",
        header: "Persentase Kekuatan Sinyal",
      },
      {
        accessorKey: "waktu",
        header: "Waktu",
      },
      {
        id: "Actions",
        cell: ({row}) => {
          return(
            <>
              <Button className='mr-2' asChild variant='outline'>
                  <Link href={`/monitoring/report/${row.original.objid}`}>Rekap Data</Link>
              </Button>
              <Button asChild variant='outline'>
                  <Link href="/bandwith">Bandwith</Link>
              </Button>
            
            </>
          )
        }
      },
  ];

    useEffect(() => {
      getSensor()
  }, [])

    return (
        <div className='space-y-11'>
            <div className=''>
                <h1 className='mb-6 text-3xl font-bold'>Monitoring Jaringan Gedung FEB</h1>
                <DataTable columns={columns} data={data} />
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