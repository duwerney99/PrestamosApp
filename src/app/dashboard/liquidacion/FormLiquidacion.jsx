'use client'

import {useState} from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem   } from '@mui/material';
import 'firebase/firestore';
import { agregarLiquidacion, obtenerSiguienteCodigoYActualizar } from '@firebase/services/liquidacion';
import { LIQUIDACION } from '@firebase/services/references';



export const FormLiquidacion = ({ dataLiquidacion, setDataLiquidacion, actualizarMostrarLiquidacion}) => {


    const [liquidacion, setLiquidacion] = useState({ codigoRuta: null, ruta: null, fechaLiquidacion: null, codigoCliente: null, valorAbono: null, saldoActual: null, fechaPrestamo: null, fechaVencimiento: null})
    const [initialComponent, setInitialComponent] = useState(true);
    
    const handleClickCancel = () => {
        actualizarMostrarLiquidacion(false);
    };

    const handleClickSave = async () => { 
        console.log('respuesta', liquidacion);
        setInitialComponent(false)
        const nuevoCodigo = await obtenerSiguienteCodigoYActualizar();
        console.log("Código obtenido:", nuevoCodigo);
        try {
            console.log('liquidacion', liquidacion);
            const respuesta = await agregarLiquidacion(LIQUIDACION, liquidacion.codigoRuta, { ...liquidacion }, nuevoCodigo);
            console.log('respuesta', respuesta);
            if (respuesta.success) {
                setDataLiquidacion([...dataLiquidacion, liquidacion]);
                actualizarMostrarLiquidacion(false);
            } else {
                console.error("Error al agregar el cliente: ", respuesta.error);
            }
        }catch (error) {
            console.error("Error al agregar el cliente: ", error);
            // Manejar el error aquí
        }
    }

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setLiquidacion({
            ...liquidacion,
            [name]: value,
        })
    }
    return (
        <div className='w-1/2 grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-center items-center'>
            <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                <div className='mb-4 flex items-center justify-center'>
                    <div className="space-y-8" >
                        <h3 className='text-xl font-bold text-green-400 mb-2'>Crear Liquidacion</h3>
                        <div className='flex '>
                            <TextField
                                onChange={onChange}
                                type="text"
                                name="codigoLiquidacion"
                                label="Código Liquidacion"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem' }}
                                value={liquidacion.codigo || 'Generando...'}
                                fullWidth
                                disabled
                            />
                            <TextField
                                onChange={onChange}
                                type="text"
                                name="ruta"
                                label="Ruta"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem' }}
                                fullWidth
                                error={!initialComponent && !liquidacion.ruta}
                                helperText={!initialComponent && !liquidacion.ruta ? 'Campo obligatorio.' : ''}
                            />
                            <div style={{ position: 'relative',  marginBottom: '1rem'}}>
                            <InputLabel htmlFor="fechaLiquidacion" style={{ position: 'absolute', top: '-1.5rem', backgroundColor: 'white', padding: '0 0.5rem' }}>Fecha Liquidacion</InputLabel>
                            <TextField
                                onChange={onChange}
                                type="date"
                                name="fechaLiquidacion"
                                // label="Fecha Liquidacion"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem' }}
                                fullWidth
                                error={!initialComponent && !liquidacion.fechaLiquidacion}
                                helperText={!initialComponent && !liquidacion.fechaLiquidacion ? 'Campo obligatorio.' : ''}
                            />
                            </div>
                            <TextField
                                onChange={onChange}
                                type="number"
                                name="codigoCliente"
                                label="Codigo Cliente"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem' }}
                                fullWidth
                                error={!initialComponent && !liquidacion.codigoCliente}
                                helperText={!initialComponent && !liquidacion.codigoCliente ? 'Campo obligatorio.' : ''}
                            />
                             <TextField
                                onChange={onChange}
                                type="number"
                                name="codigoRuta"
                                label="Codigo Ruta"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem' }}
                                fullWidth
                                error={!initialComponent && !liquidacion.codigoRuta}
                                helperText={!initialComponent && !liquidacion.codigoRuta ? 'Campo obligatorio.' : ''}
                            />
                            </div>
                            <div className='flex mgb-1rem'>
                                <TextField
                                    onChange={onChange}
                                    type="number"
                                    name="valorAbono"
                                    label="Valor Abono"
                                    variant="outlined"
                                    size="medium"
                                    style={{ marginRight: '1rem' }}
                                    fullWidth
                                    error={!initialComponent && !liquidacion.valorAbono}
                                    helperText={!initialComponent && !liquidacion.valorAbono ? 'Campo obligatorio.' : ''}
                                />
                                <TextField
                                    onChange={onChange}
                                    type="text"
                                    name="saldoActual"
                                    label="Saldo Actual"
                                    variant="outlined"
                                    size="medium"
                                    style={{ marginRight: '1rem' }}
                                    fullWidth
                                    error={!initialComponent && !liquidacion.saldoActual}
                                    helperText={!initialComponent && !liquidacion.saldoActual ? 'Campo obligatorio.' : ''}
                                />
                                <div style={{ position: 'relative',  marginBottom: '1rem'}}>
                                <InputLabel htmlFor="fechaLiquidacion" style={{ position: 'absolute', top: '-1.5rem', backgroundColor: 'white', padding: '0 0.5rem' }}>Fecha Prestamo</InputLabel>
                                <TextField
                                    onChange={onChange}
                                    type="date"
                                    name="fechaPrestamo"
                                    variant="outlined"
                                    size="medium"
                                    style={{ marginRight: '1rem' }}
                                    fullWidth
                                    error={!initialComponent && !liquidacion.fechaPrestamo}
                                    helperText={!initialComponent && !liquidacion.fechaPrestamo ? 'Campo obligatorio.' : ''}
                                />
                                </div>
                                <div style={{ position: 'relative',  marginBottom: '1rem'}}>
                                <InputLabel htmlFor="fechaVencimiento" style={{ position: 'absolute', top: '-1.5rem', backgroundColor: 'white', padding: '0 0.5rem' }}>Fecha Vencimiento</InputLabel>
                                <TextField
                                    onChange={onChange}
                                    type="date"
                                    name="fechaVencimiento"
                                    variant="outlined"
                                    size="medium"
                                    fullWidth
                                    id="fechaVencimiento"
                                    error={!initialComponent && !liquidacion.fechaVencimiento}
                                    helperText={!initialComponent && !liquidacion.fechaVencimiento ? 'Campo obligatorio.' : ''}
                                />
                        </div>
                    </div>
                </div>
            </div>
                <div className="flex justify-end">
                    <div className="mt-6">
                        <button
                            onClick={handleClickCancel}
                            className="py-3 w-40 text-xl text-white bg-gray-400 rounded-2xl">Cancelar</button>
                    </div>
                    <div className="mt-6 ml-4">
                        <button
                        onClick={handleClickSave}
                        className="py-3 w-40 text-xl text-white bg-green-400 rounded-2xl">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}