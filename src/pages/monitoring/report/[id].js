import ClientRequest from "@/utils/clientApiService";
import routeGuard from "@/utils/routeGuard";
import { withSession } from "@/utils/sessionWrapper";
import { useFormik } from "formik";
import moment from "moment";
import { saveAs } from 'file-saver';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export default function RekapData( {accessToken, idSensor} ) {

    const [dataSensor, setDataSensor] = useState([])

    const getDataSensor = async () => {
        try {
            const res = await ClientRequest.GetListSensorById(accessToken, idSensor)
            setDataSensor(res.data.data.sensor)
        } catch (error) {
        }
    }

    useEffect(() => {
        getDataSensor()
    }, [])
    
    const formik = useFormik({
        initialValues: {
            id: '',
            intervalWaktu: '',
            formatEkspor: '',
        },
        validate: (values) => {
            const requireFields = ['id',  'intervalWaktu', 'formatEkspor'];
            const errors = {};

            requireFields.forEach(field => {
                if (!values[field]) {
                    errors[field] = '* Field wajib diisi';
                }
            });

            return errors;
        },
        onSubmit: async (values) => {
            console.log(values);

            try {
                if(values.formatEkspor == 'CSV') {
                    const res = await ClientRequest.GetHistoricDataCsv(values.id, values.intervalWaktu, accessToken)
                    
                    const isiData = res.data // ini adalah isi data csv saya
                    const blob = new Blob([isiData], { type: 'text/csv;charset=utf-8;' });
                    saveAs(blob, 'data.csv');
                }
                if (values.formatEkspor == 'HTML'){
                    const res = await ClientRequest.GetHistoricData(values.id, values.intervalWaktu, accessToken)
                    if (res.headers['content-type'].includes('text/html')) {
                        // Membuat jendela baru dan menulis HTML di dalamnya
                        const newWindow = window.open();
                        newWindow.document.write(res.data);
                        newWindow.document.close();
                    }
                }   
                if (values.formatEkspor === 'PDF') {
                    const res = await ClientRequest.GetHistoricData(values.id, values.intervalWaktu, accessToken)
                    const newWindow = window.open();
                    newWindow.document.write(res.data);
                    newWindow.document.close();

                    // Tunggu sampai halaman baru selesai dimuat
                    newWindow.onload = async function () {
                        const element = newWindow.document.documentElement;
                        const canvas = await html2canvas(element);
                        const imgData = canvas.toDataURL('image/png');

                        const pdf = new jsPDF('p', 'mm', 'a4');
                        const imgProps = pdf.getImageProperties(imgData);
                        const pdfWidth = pdf.internal.pageSize.getWidth();
                        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                        pdf.save('download.pdf');

                        newWindow.close();
                    };

                }
            } catch (error) {
                console.log(error)
            }
        },
        validateOnChange: true,
    });

    const formatInputDate = (inputDate) => {
        return moment(inputDate).format('YYYY-MM-DD-HH-mm-ss');
    }

    return (
        <div className='space-y-4 bg-white py-10 px-5 pb-4 rounded-xl shadow-2xl'>
            <h1 className='mb-6 text-3xl font-bold'>Rekap Sensor Device</h1>
            <div className='space-y-3 w-full'>
                <h1 className="font-semibold">Jenis Sensor Device</h1>
                <select
                    name='id'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border p-2 rounded-lg outline-none w-full'
                >
                    <option value="">Pilih Sensor ...</option>
                    {Object.values(dataSensor).map((item, idx) => (
                        <option key={idx} value={item.objid}>{item.sensor}</option>
                    ))}
                </select>
                {formik.touched.id && formik.errors.id ? (
                    <div className='text-red-500 font-semibold text-xs'>{formik.errors.id}</div>
                ) : null}
            </div>
            <div className='space-y-3 w-full'>
                <h1 className="font-semibold">Format Ekspor</h1>
                <select
                    name='formatEkspor'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border p-2 rounded-lg outline-none w-full'
                >
                    <option value="">Pilih Format Ekspor</option>
                    <option value="CSV">CSV</option>
                    <option value="HTML">HTML</option>
                    <option value="PDF">PDF</option>
                </select>
                {formik.touched.formatEkspor && formik.errors.formatEkspor ? (
                    <div className='text-red-500 font-semibold text-xs'>{formik.errors.formatEkspor}</div>
                ) : null}
            </div>
            <div className='space-y-3 w-full'>
                <h1 className="font-semibold">Interval Waktu</h1>
                <select
                    name='intervalWaktu'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border p-2 rounded-lg outline-none w-full'
                >
                    <option value="">Pilih Interval Waktu...</option>
                    {formik.values.formatEkspor === 'CSV' ? (
                        <>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </>
                    ) : (
                        <>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </>
                    )}
                </select>
                {formik.touched.intervalWaktu && formik.errors.intervalWaktu ? (
                    <div className='text-red-500 font-semibold text-xs'>{formik.errors.intervalWaktu}</div>
                ) : null}
            </div>
            

            <div className="flex items-center justify-end">
                <Button variant='' size='lg' onClick={formik.handleSubmit} type='submit'>Rekap</Button>
            </div>
        </div>
    );
}

export const getServerSideProps = withSession(async (context) => {
    const {req, query} = context
    const accessToken = req.session?.auth?.access_token;
    const isLoggedIn = !!accessToken;
    const idSensor = query.id
    
    const validator = [isLoggedIn];
    return routeGuard(validator, '/auth/login', {
        props: {
            accessToken,
            idSensor
        }
    });
});
