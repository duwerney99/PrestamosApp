'use client'
import { FormPrestamo } from "./FormPrestamo"
import { TablePrestamo } from "./TablePrestamo"
import { useState } from 'react'
import { Button } from '@mui/material'
import firebase from "@firebase/app"
import 'firebase/firestore'



const data = [
    {
        codigo: "0001",
        nombreCliente: "Santiago",
        saldoActual: "200000",
        saldo: 10000,
        valorAbono: 2500,
        abono: 2000,
        diasPago: "Semanal",
        Intereses: "En mora",
        fechaPrestamo: "3012347145",
        plazos: 'sabntiago@gmail.com',
        cuotas: '5',
        estado: "Inactivo"
    },
    {
        codigo: "0002",
        nombreCliente: "Santiago",
        saldo: 5000,
        valorAbono: "2500",
        saldoActual: "400000",
        abono: 3000,
        diasPago: "15nal",
        Intereses: "5000",
        fechaPrestamo: "3012347145",
        plazos: 'sabntiago@gmail.com',
        cuotas: '5',
        estado: "Inactivo"
    },
    {
        codigo: "0003",
        nombreCliente: "Santiago",
        saldo: 15000,
        valorAbono: 2500,
        saldoActual: "800000",
        abono: 10000,
        diasPago: "Mensual",
        Intereses: "40000",
        fechaPrestamo: "3012347145",
        plazos: 'sabntiago@gmail.com',
        cuotas: '5',
        estado: "Inactivo"
    }]



export default function Page () {
    const [mostrarCrearPrestamo, setMostrarCrearPrestamo] = useState(true);

    const [prestamo, setPrestamo] = useState({
        codigo: '',
        nombreCliente: '',
        saldoActual: '',
        saldo: '',
        valorAbono: '',
        abono: '',
        diasPago: '',
        Intereses: '',
        fechaPrestamo: '',
        plazos: '',
        cuotas: '',
        estado: ''
    });

    const actualizarMostrarCrearPrestamo = (value) => {
        setMostrarCrearPrestamo(value);
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setPrestamo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const guardarPrestamo = () => {
        // Verificar que firebase esté inicializado
        if (!firebase.apps.length) {
            const firebaseConfig = {
                // Tu configuración de Firebase
            };
            firebase.initializeApp(firebaseConfig);
        }
    
        // Acceder a Firestore
        const db = firebase.firestore();
    
        // Realizar operaciones en Firestore
        db.collection('prestamos').add(prestamo)
            .then(() => {
                console.log('Prestamo guardado en Firestore');
            })
            .catch(error => {
                console.error('Error al guardar el préstamo:', error);
            });
    };


    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { mostrarCrearPrestamo && <FormPrestamo actualizarMostrarCrearPrestamo={actualizarMostrarCrearPrestamo}/>}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                            <div className='mb-4 flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Prestamos</h3>
                                </div>
                                <div className='flex-shrink-0'>
                                    <button  
                                        className={`text-lg font-medium 'text-green-400 hover:bg-gray-100' rounded-lg p-2`}>
                                        Crear Prestamo
                                    </button>
                                    
                                </div>
                                <Button onClick={guardarPrestamo}>Guardar Prestamo</Button>
                            </div>
                            <TablePrestamo mostrarCrearPrestamo={mostrarCrearPrestamo} data={data}/>
                        </div>
                </div>
            </div>
        </div> 
    )
}