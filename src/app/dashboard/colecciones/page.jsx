'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FormCreate } from "./FormCreate";
import { FormEdit } from "./FormEdit";
import { TableColeccion } from "./TableColeccion";
import { agregarColeccion } from '@redux/actions/coleccionActions';

const data = [
    {
        codigo: "0001",
        fecha_creacion: "2022-09-30",
        nombre: "Coleccion uno"
    },
    {
        codigo: "0002",
        fecha_creacion: "2021-09-30",
        nombre: "Coleccion dos"
    }
]

export default function Page () {
    const [mostrarCrearColeccion, setActualizarCrearColeccion] = useState(false);
    const [mostrarEditarColeccion, setEditarColeccion] = useState(false);
    const [coleccion, setColeccion] = useState({});
    const coleccionReducer = useSelector((state) => state.coleccionReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!JSON.stringify(coleccionReducer.colecciones) !== JSON.stringify(data)) dispatch(agregarColeccion(data));
    }, []);


    const actualizarCrearColeccion = (value) => {
        setActualizarCrearColeccion(value);
    }

    const actualizarEditarColeccion = (value) => {
        setEditarColeccion(value);
    }

    const editColeccionTable = (value, item) => {
        setColeccion(item);
        setEditarColeccion(value);
    }
    
    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { mostrarCrearColeccion && <FormCreate actualizarCrearColeccion={actualizarCrearColeccion}/>}
            </div>
            <div className='pt-6 px-4'>
                { mostrarEditarColeccion && <FormEdit coleccion={coleccion} actualizarEditarColeccion={actualizarEditarColeccion} />}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                            <div className='mb-4 flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Colecciones</h3>
                                </div>
                                <div className='flex-shrink-0'>
                                    <button disabled={mostrarEditarColeccion || mostrarCrearColeccion}
                                        onClick={() => setActualizarCrearColeccion(true)}
                                        className={`text-lg font-medium ${
                                            mostrarEditarColeccion || mostrarCrearColeccion ? 'text-gray-500' : 'text-sky-600 hover:bg-gray-100'
                                        } rounded-lg p-2`}>
                                        Crear Colección
                                    </button>
                                    
                                </div>
                            </div>
                            <TableColeccion mostrarCrearColeccion={mostrarCrearColeccion} editColeccionTable={editColeccionTable}/>
                        </div>
                </div>
            </div>
        </div> 
    )
}
