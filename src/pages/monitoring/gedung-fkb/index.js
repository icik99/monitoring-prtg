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
import { Rings } from 'react-loader-spinner';

export default function MonitoringFKB({accessToken}) {
    const [data, setData] = useState([]);
    const [modalShowBandwith, setModalShowBandwith] = useState(false)
    const [dataSvgBandiwth, setDataSvgBandwith] = useState('')
    const [dataSvgPing, setDataSvgPing] = useState('')
    const [dataSvgJitter, setDataSvgJitter] = useState('')

  const [dataAp, setDataAp] = useState([]);

  const getDataAksesPoin = async () => {
    try {
      const res = await axios.get('../dataAksesPoin.json')
      setDataAp(res.data.FKB)
    } catch (error) {
      
    }
  }

  const dataMonitoring = data.map(monitor => {
    const matchedAP = dataAp.find(ap => ap.SSID === monitor.ssid);
    return {
        ...monitor,
        Location: matchedAP ? matchedAP.Location : "Location not found"
    };
  });

    const convertToMbit = (value) => {
      return (value / 1024).toFixed(2);
    };

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
        accessorKey: "Location",
        header: "Lokasi",
      },
      {
        accessorKey: "kecepatanDownload",
        header: "Kecepatan Upload",
        cell: ({row}) => (
          <h1>{convertToMbit(row.original.kecepatanDownload)} Mbit/S</h1>
        )
      },
      {
        accessorKey: "kecepatanUpload",
        header: "Kecepatan Download",
        cell: ({row}) => (
          <h1>{convertToMbit(row.original.kecepatanUpload)} Mbit/S</h1>
        )
      },
      {
        accessorKey: "ping",
        header: "Ping",
        cell: ({row}) => (
          <h1>{row.original.ping} Ms</h1>
        )
      },
      {
        accessorKey: "jitter",
        header: "Jitter",
        cell: ({row}) => (
          <h1>{row.original.jitter} Ms</h1>
        )
      },
      {
        accessorKey: "presentaseKekuatanSinyal",
        header: "Persentase Kekuatan Sinyal",
        cell: ({row}) => (
          <h1>{row.original.presentaseKekuatanSinyal || 0} %</h1>
        )
      },
      {
        accessorKey: "waktu",
        header: "Waktu",
        cell: ({row}) => (
          <h1>{row.original.waktu || '-'}</h1>
        )
      },
      {
        id: "Actions",
        cell: ({row}) => {
          return(
            <>
              <Button className='mr-2' asChild variant='outline'>
                  <Link href={`/monitoring/report/${row.original.objid}`}>Rekap Data</Link>
              </Button>
            
            </>
          )
        }
      },
    ];

    const openModalBandwith = async (idBandiwth, idPing, idJitter) => { 
      setModalShowBandwith(!modalShowBandwith)
        try {
          const resBandwith = await ClientRequest.GetBandwith(idBandiwth, accessToken)
          const resPing = await ClientRequest.GetBandwith(idPing, accessToken)
          const resJitter = await ClientRequest.GetBandwith(idJitter, accessToken)
          setDataSvgBandwith(resBandwith.data)
          setDataSvgPing(resPing.data)
          setDataSvgJitter(resJitter.data)
        } catch (error) {
          console.log(error)
        }
    }


    const getSensor = async () => {
      try {
          const res = await ClientRequest.GetDataMonitoring(accessToken, '2138') 
          setData(res.data.data)
          console.log(res.data.data, 'DATA MONITORING')
      } catch (error) {
          console.log(error)
      }
  }
  
  

  useEffect(() => {
    getSensor()
    getDataAksesPoin()

    const intervalId = setInterval(() => {
      getSensor()
    }, 300000) // trigger tiap 5 menit

    return () => clearInterval(intervalId)
  }, [])

  if (data.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Rings
          height="80"
          width="80"
          color="#b6252a"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
        <h1>Loading data from PRTG...</h1>
      </div>
    );
  }
    return (
      <>
      <Modal 
        activeModal={modalShowBandwith}
        title={'Grafik'}
        buttonClose={ () => setModalShowBandwith(!modalShowBandwith)}
        width={'1000px'}
        content= {
            <div className='px-12 pb-10'>
              <div className=''>
                <h1 className='font-semibold'>Grafik Bandwith</h1>
                <div dangerouslySetInnerHTML={{ __html: dataSvgBandiwth }} />
              </div>
              <div className='border-t-2 pt-2'>
                <h1 className='font-semibold'>Grafik PING</h1>
                <div dangerouslySetInnerHTML={{ __html: dataSvgPing }} />
              </div>
              <div className='border-t-2 pt-2'>
                <h1 className='font-semibold'>Grafik Jitter</h1>
                <div dangerouslySetInnerHTML={{ __html: dataSvgJitter }} />
              </div>
            </div>
        }
      />
        <div className='space-y-11'>
            <div className=''>
              <div className='flex items-center justify-center'>
                <h1 className='mb-6 text-xl lg:text-3xl font-bold bg-gradient-to-r from-red-800 to-red-700 text-white py-2 lg:py-3 px-4 lg:px-5 w-fit rounded-lg'>
                  Monitoring Jaringan Gedung FKB
                </h1>
              </div>
                <DataTable columns={columns} data={dataMonitoring} />
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