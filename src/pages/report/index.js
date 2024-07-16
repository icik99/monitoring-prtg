import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import moment from 'moment'; 
import ClientRequest from '@/utils/clientApiService';

export default function RekapData( {resDataSensor} ) {
    
    const formik = useFormik({
        initialValues: {
            id: '',
            startDate: '',
            endDate: '',
            intervalWaktu: '',
            formatEkspor: '',
        },
        validate: (values) => {
            const requireFields = ['id', 'startDate', 'endDate', 'intervalWaktu', 'formatEkspor'];
            const errors = {};

            requireFields.forEach(field => {
                if (!values[field]) {
                    errors[field] = '* Field wajib diisi';
                }
            });

            return errors;
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validateOnChange: true,
    });

    const formatInputDate = (inputDate) => {
        return moment(inputDate).format('YYYY-MM-DD-HH-mm-ss');
    }

    return (
        <div className='space-y-4'>
            <h1 className='mb-6 text-5xl font-bold'>Report Sensor</h1>
            <div className='space-y-2'>
                <h1>Jenis Sensor Device</h1>
                <select
                    name='id'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border p-2 rounded-lg outline-none'
                >
                    <option value="">Pilih Sensor ...</option>
                    <option value="SNMP Traffic">SNMP Traffic</option>
                    <option value="Ping">Ping</option>
                    <option value="Jitter">Jitter</option>
                </select>
                {formik.touched.id && formik.errors.id ? (
                    <div className='text-red-500 font-semibold text-xs'>{formik.errors.id}</div>
                ) : null}
            </div>
            <div className='space-y-2'>
                <h1>Range Tanggal & Waktu</h1>
                <div className='flex items-center justify-start gap-2'>
                    <div>
                        <h1>Start Date</h1>
                        <input
                            name='startDate'
                            onChange={(e) => formik.setFieldValue('startDate', formatInputDate(e.target.value))}
                            onBlur={formik.handleBlur}
                            type="datetime-local"
                            className='border p-2 rounded-lg outline-none'
                        />
                        {formik.touched.startDate && formik.errors.startDate ? (
                            <div className='text-red-500 font-semibold text-xs'>{formik.errors.startDate}</div>
                        ) : null}
                    </div>
                    <div>
                        <h1>End Date</h1>
                        <input
                            name='endDate'
                            onChange={(e) => formik.setFieldValue('endDate', formatInputDate(e.target.value))}
                            onBlur={formik.handleBlur}
                            type="datetime-local"
                            className='border p-2 rounded-lg outline-none'
                        />
                        {formik.touched.endDate && formik.errors.endDate ? (
                            <div className='text-red-500 font-semibold text-xs'>{formik.errors.endDate}</div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className='space-y-2'>
                <h1>Interval Waktu</h1>
                <select
                    name='intervalWaktu'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border p-2 rounded-lg outline-none'
                >
                    <option value="">Pilih Interval Waktu...</option>
                    <option value="3600">1 Jam</option>
                    <option value="7200">2 Jam</option>
                    <option value="14400">4 Jam</option>
                    <option value="86400">24 Jam / 1 Hari</option>
                </select>
                {formik.touched.intervalWaktu && formik.errors.intervalWaktu ? (
                    <div className='text-red-500 font-semibold text-xs'>{formik.errors.intervalWaktu}</div>
                ) : null}
            </div>
            <div className='space-y-2'>
                <h1>Format Ekspor</h1>
                <select
                    name='formatEkspor'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border p-2 rounded-lg outline-none'
                >
                    <option value="">Pilih Format Ekspor</option>
                    <option value="CSV">CSV</option>
                    <option value="HTML dan PDF">HTML dan PDF</option>
                </select>
                {formik.touched.formatEkspor && formik.errors.formatEkspor ? (
                    <div className='text-red-500 font-semibold text-xs'>{formik.errors.formatEkspor}</div>
                ) : null}
            </div>

            <button onClick={formik.handleSubmit} type='submit'>Submit</button>
        </div>
    );
}

export const getServerSideProps = withSession(async ({ req }) => {
    const accessToken = req.session?.auth?.access_token;
    const isLoggedIn = !!accessToken;
    
    const validator = [isLoggedIn];
    return routeGuard(validator, '/auth/login', {
        props: {
        }
    });
});
