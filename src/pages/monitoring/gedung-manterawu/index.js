import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/Tabel';
import Link from 'next/link';
import { withSession } from '@/utils/sessionWrapper';
import routeGuard from '@/utils/routeGuard';
import ClientRequest from '@/utils/clientApiService';
import Modal from '@/components/Modal';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function MonitoringManterawu({accessToken}) {
    const [data, setData] = useState([]);
    const [modalShowBandwith, setModalShowBandwith] = useState(false)
    const [dataSvg, setDataSvg] = useState('')

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
              <Button onClick={() => openModalBandwith(row.original.idSNMP)} variant='outline'>
                  Bandwith
              </Button>
            
            </>
          )
        }
      },
    ];

    const openModalBandwith = async (id) => { // parameter adalah id sensor snmp
      setModalShowBandwith(!modalShowBandwith)
      if(!id){
        toast.error('Device ini tidak memiliki sensor SNMP')
        // setModalShowBandwith(!modalShowBandwith)
        try {
          const res = await ClientRequest.GetBandwith(id, accessToken)// asumsi data svg berbentuk string
          console.log(res, 'res bandwith')
          setDataSvg(res.data)
        } catch (error) {
          console.log(error)
          
        }
      } else {
      }
    }


    const getSensor = async () => {
      try {
          const res = await ClientRequest.GetDataMonitoring(accessToken, '2084') 
          setData(res.data.data)
          console.log(res.data)
      } catch (error) {
          console.log(error)
      }
  }
  
  

  useEffect(() => {
    getSensor()

    const intervalId = setInterval(() => {
      getSensor()
    }, 300000) // trigger tiap 5 menit

    return () => clearInterval(intervalId)
  }, [])

    return (
      <>
      <Modal 
        activeModal={modalShowBandwith}
        title={'Grafik Bandwith'}
        buttonClose={ () => setModalShowBandwith(!modalShowBandwith)}
        width={'1000px'}
        content= {
            <div className='px-12 pb-5'>
              <div dangerouslySetInnerHTML={{ __html: dataSvg }} />
            </div>
        }
      />
        <div className='space-y-11'>
            <div className=''>
                <h1 className='mb-6 text-3xl font-bold'>Monitoring Jaringan Gedung Manterawu</h1>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
      </>
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