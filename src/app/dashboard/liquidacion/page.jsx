'use client'

import { consultarLiquidacion } from "@firebase/services/liquidacion"
import { FormLiquidacion } from "./FormLiquidacion"
import { TableLiquidacion } from "./TableLiquidacion"
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { LIQUIDACION, PRESTAMOS, RUTAS } from "@firebase/services/references"
import { consultarRutas } from '@firebase/services/rutas';
import { consultarPrestamos } from "@firebase/services/prestamos"



export default function Page() {
    const [mostrarLiquidacion, setMostrarLiquidacion] = useState(false);
    const [dataLiquidacion, setDataLiquidacion] = useState([]);
    const [dataAMostrar, setDataAMostrar] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [fechaMostrar, setFechaMostrar] = useState([]);
    const [dataPrestamoStatic, setDataPrestamoStatic] = useState([]);
    const [setRuta, setSelectedRuta] = useState([]);

    useEffect(() => {
        async function fetchLiquidacion() {
            const response = await consultarLiquidacion(LIQUIDACION);
            if (response.data) {


                // Filtrar los documentos para obtener solo los de la fecha actual
                const liquidacionesHoy = response.data.filter(liquidacion => {
                    console.log("liquidacionesHoydata", response.data);
                    const fechaLiquidacion = liquidacion.codigo.replace(/-/g, '');
                    console.log("liquidaciones", fechaLiquidacion);

                    return fechaLiquidacion;
                });

                console.log("liquidacionesHoy", liquidacionesHoy);


                setDataLiquidacion(liquidacionesHoy);

                const responsePres = await consultarPrestamos(PRESTAMOS);
                if (responsePres.data) {
                    const sortedClientes = responsePres.data.sort((a, b) => a.codigo - b.codigo);
                    console.log("Sorteo ", sortedClientes);

                    setDataPrestamoStatic(sortedClientes);
                }

                const resultRuta = await consultarRutas(RUTAS);
                if (resultRuta.statusResponse) {
                    setRutas(resultRuta.data);
                } else {
                    console.error(resultRuta.error);
                }
            }
        }

        fetchLiquidacion();
    }, []);

    const cambiarFecha = (fecha) => {

        console.log("Fecha que llega", fecha)
        const fechaConvertida = new Date(fecha);

        const year1 = fechaConvertida.getFullYear();
        const month1 = String(fechaConvertida.getMonth() + 1).padStart(2, '0');
        const dia1 = String(fechaConvertida.getDate()).padStart(2, '0');
        const fechaFormateada1 = `${year1}-${month1}-${dia1}`
        setFechaMostrar(fechaFormateada1);

        const listaLiquidacion = [];
        dataLiquidacion.forEach((data) => {
            const fechaLiquiDacion = new Date(data.fechaLiquidacion);

            fechaLiquiDacion.setHours(fechaLiquiDacion.getHours() + 5);
            const anoLiquidacion = fechaLiquiDacion.getFullYear();
            const mesLiquidacion = String(fechaLiquiDacion.getMonth() + 1).padStart(2, '0');
            const diaLiquidacion = String(fechaLiquiDacion.getDate()).padStart(2, '0');
            const fechaFormateadaLiquidacion = `${anoLiquidacion}-${mesLiquidacion}-${diaLiquidacion}`

            console.log("fechaFormateadaLiquidacion ", fechaFormateadaLiquidacion)

            
            
            if (fechaFormateadaLiquidacion === fechaFormateada1) {
                listaLiquidacion.push(data)
            }
            
        })
        const dataFiltrada = listaLiquidacion.filter((data) => data.codigoRuta === setRuta);
        setDataAMostrar(dataFiltrada);
        // setFechaMostrar(fechaFormateada1);
    }



    const actualizarMostrarLiquidacion = (value) => {
        setMostrarLiquidacion(value);
    }

    const onChange = (e) => {
        const value = e.target.value;
        console.log("value ", value)
        setSelectedRuta(value); // Guarda la ruta seleccionada
        cambiarFecha(fechaMostrar);
    }


    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                {mostrarLiquidacion && <FormLiquidacion dataLiquidacion={dataLiquidacion} setDataLiquidacion={setDataLiquidacion} actualizarMostrarLiquidacion={actualizarMostrarLiquidacion} />}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                        <div className='mb-4 flex items-center justify-between'>
                            <div>
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>Liquidacion</h3>
                                {dataAMostrar.length > 0 ? (
                                    <h2>{dataAMostrar.map((data) => parseFloat(data.valorAbono)).reduce((acomuldor, saldo) => acomuldor + saldo, 0)}</h2>
                                ) : "No hay nada"}

                                <FormControl fullWidth>
                                    <InputLabel>Rutas</InputLabel>
                                    <Select
                                        label="rutas"
                                        name='rutas'
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: '1rem' }}
                                        onChange={onChange}

                                    >
                                        {rutas.map((ruta) => (
                                            <MenuItem key={ruta.id} value={ruta.ruta}>
                                                {ruta.ruta}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='flex-shrink-0'>
                                <button disabled={mostrarLiquidacion}
                                    onClick={() => setMostrarLiquidacion(true)}
                                    className={`text-lg font-medium ${mostrarLiquidacion ? 'text-gray-500' : 'text-green-400 hover:bg-gray-100'
                                        } rounded-lg p-2`}>
                                    Crear Liquidacion
                                </button>

                            </div>
                        </div>
                        {dataLiquidacion && dataLiquidacion.length > 0 && <TableLiquidacion mostrarLiquidacion={mostrarLiquidacion} data={dataAMostrar} cambiarFecha={cambiarFecha} />}
                    </div>
                </div>
            </div>
        </div>
    )
}