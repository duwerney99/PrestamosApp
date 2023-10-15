'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { agregarReferencia } from '@redux/actions/referenciaActions';
import { TableReferencia } from './TableReferencia';
import { FormCreate } from './FormCreate';
import { FormEdit } from './FormEdit';

const data = [
    {
        codigo: "REF001",
        coleccion: "0001",
        fecha_creacion: "2022-09-30",
        nombre: "Referencia Buso"
    },
    {
        codigo: "REF002",
        coleccion: "0002",
        fecha_creacion: "2021-09-30",
        nombre: "Referencia Camiseta"
    }
]

export default function Page () {
    const [mostrarCrearReferencia, setActualizarCrearReferencia] = useState(false);
    const [mostrarEditarReferencia, setEditarReferencia] = useState(false);
    const [referencia, setReferencia] = useState({});
    const referenciaReducer = useSelector((state) => state.referenciaReducer)
    const coleccionReducer = useSelector((state) => state.coleccionReducer)
    coleccionReducer.colecciones
    const dispatch = useDispatch();

    useEffect(() => {
        if (!JSON.stringify(referenciaReducer.referencias) !== JSON.stringify(data)) dispatch(agregarReferencia(data));
    }, []);


    const actualizarCrearReferencia = (value) => {
        setActualizarCrearReferencia(value);
    }

    const actualizarEditarReferencia = (value) => {
        setEditarReferencia(value);
    }

    const editarReferenciaTable = (value, item) => {
        setReferencia(item);
        setEditarReferencia(value);
    }
    
    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { mostrarCrearReferencia && <FormCreate actualizarCrearReferencia={actualizarCrearReferencia}/>}
            </div>
            <div className='pt-6 px-4'>
                { mostrarEditarReferencia && <FormEdit referencia={referencia} actualizarEditarReferencia={actualizarEditarReferencia} />}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                            <div className='mb-4 flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Referencias</h3>
                                </div>
                                <div className='flex-shrink-0'>
                                    <button disabled={mostrarEditarReferencia || mostrarCrearReferencia}
                                        onClick={() => setActualizarCrearReferencia(true)}
                                        className={`text-lg font-medium ${
                                            mostrarEditarReferencia || mostrarCrearReferencia ? 'text-gray-500' : 'text-sky-600 hover:bg-gray-100'
                                        } rounded-lg p-2`}>
                                        Crear Referencia
                                    </button>
                                    
                                </div>
                            </div>
                            <TableReferencia mostrarCrearReferencia={mostrarCrearReferencia} editarReferenciaTable={editarReferenciaTable}/>
                        </div>
                </div>
            </div>
        </div> 
    )
}
