'use client'

import { consultarLiquidacion } from "@firebase/services/liquidacion"
import { FormLiquidacion } from "./FormLiquidacion"
import { TableLiquidacion } from "./TableLiquidacion"
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { LIQUIDACION } from "@firebase/services/references"



export default function  Page () {
    const [mostrarLiquidacion, setMostrarLiquidacion] = useState(true);
    const [dataLiquidacion, setDataLiquidacion] = useState([]);

    useEffect(() => {
        async function fetchLiquidacion() {
            const response = await consultarLiquidacion(LIQUIDACION);
            if (response.data) {
                // Obtener la fecha actual en formato yymmAA
                const fechaActual = new Date();
                const año = fechaActual.getFullYear().toString();
                const añoCompleto = año.substring(0, 2) + año.substring(2);
                const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
                const dia = fechaActual.getDate().toString().padStart(2, '0');
                const fechaActualFormateada = añoCompleto + mes + dia;

                console.log("Fecha actual en formato yymmAA:", fechaActualFormateada);
    
                // Filtrar los documentos para obtener solo los de la fecha actual
                const liquidacionesHoy = response.data.filter(liquidacion => {
                    console.log("data", response.data);
                    const fechaLiquidacion = liquidacion.codigo.replace(/-/g, '').substring(2);
                    
                    console.log("fechaLiquidacion", fechaLiquidacion);

                    return fechaLiquidacion === fechaLiquidacion;
                });

                console.log("liquidacionesHoy", liquidacionesHoy);
                // Ordenar los documentos filtrados por código (fecha)
                liquidacionesHoy.sort((a, b) => {
                    const valorA = a.fechaLiquidacion.replace(/-/g, '').substring(2);
                    console.log("valorA", valorA);
                    const valorB = b.fechaLiquidacion.replace(/-/g, '').substring(2);
                    console.log("valorB", valorB);
                    return valorA.localeCompare(valorB);
                });
    
                setDataLiquidacion(liquidacionesHoy);
            }
        }
    
        fetchLiquidacion();
    }, []);




    const actualizarMostrarLiquidacion = (value) => {
        setMostrarLiquidacion(value);
    }
    
    
    

    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { mostrarLiquidacion && <FormLiquidacion dataLiquidacion={dataLiquidacion} setDataLiquidacion={setDataLiquidacion} actualizarMostrarLiquidacion={actualizarMostrarLiquidacion}/>}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                            <div className='mb-4 flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Liquidacion</h3>
                                </div>
                                <div className='flex-shrink-0'>
                                    <button disabled={mostrarLiquidacion}
                                        onClick={() => setMostrarLiquidacion(true)}
                                        className={`text-lg font-medium ${
                                            mostrarLiquidacion ? 'text-gray-500' : 'text-green-400 hover:bg-gray-100'
                                        } rounded-lg p-2`}>
                                        Crear Liquidacion
                                    </button>
                                    
                                </div>
                            </div>
                            { dataLiquidacion && dataLiquidacion.length > 0 && <TableLiquidacion mostrarLiquidacion={mostrarLiquidacion} data={dataLiquidacion}/>}
                        </div>
                </div>
            </div>    
        </div>
    )
}